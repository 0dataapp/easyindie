const OLSKCache = require('OLSKCache');

const mod = {

	// DATA

	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilFS: require('fs'),
	_DataFoilProjects: require('../api-projects/controller.js'),

	async _DataImagePipe (url, file) {
		const {createWriteStream} = require('fs');
		const {pipeline} = require('stream');
		const {promisify} = require('util');
		const fetch = require('node-fetch');

		const streamPipeline = promisify(pipeline);

		const response = await fetch(url);

		if (!response.ok)
			throw new Error(`unexpected response ${response.statusText}`);

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
			return _mod._DataImagePipe(inputData, mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(inputData)));
		});
	},

	SetupImages () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilProjects.DataProjects().filter(function (e) {
			return e.EASProjectIconURL && !e._EASProjectIconURLCachedPath;
		}).map(function (e) {
			return _mod._SetupImage(e.EASProjectIconURL);
		});
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	require('OLSKModule').OLSKModuleLifecycleSetup(mod);
}

Object.assign(exports, mod);
