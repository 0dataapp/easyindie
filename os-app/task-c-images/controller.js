const OLSKCache = require('OLSKCache');

const mod = {

	OLSKControllerTasks () {
		return [{
			OLSKTaskName: 'EASImagesStartFetch',
			OLSKTaskFireTimeInterval: 10,
			OLSKTaskShouldBePerformed () {
				return true;
			},
			OLSKTaskCallback: (function () {
				require('OLSKModule').OLSKModuleLifecycleSetup(mod);
			}),
			OLSKTaskFireLimit: 1,
		}, {
			OLSKTaskName: 'EASImagesFetchIncoming',
			OLSKTaskFireTimeInterval: 60 * 60,
			OLSKTaskShouldBePerformed () {
				return true;
			},
			OLSKTaskCallback: mod.SetupImages,
		}];
	},

	// DATA

	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilFS: require('fs'),
	_DataFoilProjects: require('../api-projects/controller.js'),
	_DataFoilBanks: require('../task-a-banks/controller.js'),

	async _DataImagePipe (url, file) {
		const {createWriteStream} = require('fs');
		const {pipeline} = require('stream');
		const {promisify} = require('util');
		const fetch = require('node-fetch');

		const streamPipeline = promisify(pipeline);

		const response = await fetch(url);

		if (!response.ok) {
			return console.error(new Error(`unexpected response ${response.statusText}`));
		}

		require('OLSKDisk').OLSKDiskCreateFolder(require('path').dirname(file));

		await streamPipeline(response.body, createWriteStream(file));
	},

	DataCachePath (inputData = '') {
		if (typeof inputData !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', 'ui-assets', inputData);
	},

	DataCacheLocalPath (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		const localURL = mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(inputData));
		return _mod._DataFoilFS.existsSync(localURL) ? localURL.replace(require('path').join(__dirname, '../'), '/') : null;
	},

	// SETUP

	SetupFetchQueue () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod._ValueFetchQueue = _mod._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	_SetupImage (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._ValueFetchQueue.OLSKQueueAdd(function () {
			return mod.DataCacheLocalPath(inputData) || _mod._DataImagePipe(inputData, mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(inputData)));
		});
	},

	SetupImages () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilProjects.DataProjects().filter(function (e) {
			return e.EASProjectIconURL && !e._EASProjectIconURLCachedPath;
		}).map(function (e) {
			return e.EASProjectIconURL;
		}).concat(_mod._DataFoilBanks.DataBankPlatforms().reduce(function (coll, item) {
			return coll.concat(item.EASPlatformIconURL && !item._EASPlatformIconURLCachedPath ? item.EASPlatformIconURL : []);
		}, [])).map(_mod._SetupImage);
	},

};

Object.assign(exports, mod);
