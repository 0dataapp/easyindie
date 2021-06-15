const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');

const uSerial2 = function (inputData) {
	return inputData.reduce(async function (coll, e) {
		return (await coll).concat(await new Promise(function (res, rej) {
			try {
				res(e());
			} catch (error) {
				rej(error);
			}
		}));
	}, Promise.resolve([]));
};

const mod = {

	OLSKControllerSharedLocals () {
		return {
			EASGlanceProjectsSourceURLs: mod.DataListingURLs(),
		}
	},

	_ValueItemsCache: {},

	// DATA

	_DataFoilOLSKCache: OLSKCache,
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilFS: require('fs'),

	async _DataContentString (inputData) {
		return (await require('node-fetch')(inputData)).text();
	},

	DataListingURLs() {
		return process.env.EAS_VITRINE_LISTING_URLS.split(',');
	},

	DataListingURLYunohost () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/yunohost/);
		}).shift();
	},

	_DataListingObjects (param1, param2) {
		if (!mod.DataListingURLs().includes(param1)) {
			throw new Error('EASErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		return Array.from(mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: {
					[mod.DataListingURLYunohost()]: function () {
						return cheerio('.app-cards-list', param2).find('.app-card').map(function () {
							const EASPlatformCategory = cheerio('.app-title .label', this).text();

							const EASPlatformRepoURL = cheerio('.app-buttons a:nth-of-type(1)', this).attr('href');
							return {
								EASProjectName: cheerio('.app-title', this).text().slice(0, -EASPlatformCategory.length - 1).trim(),
								EASProjectBlurb: cheerio('.app-descr', this).text(),

								EASProjectURL: EASPlatformRepoURL,
								EASProjectPlatforms: {
									EASPlatformYunohost: {
										EASPlatformCategory,
										EASPlatformRepoURL,
										EASPlatformDocsPath: cheerio('.app-buttons a:nth-of-type(2)', this).attr('href'),
										EASPlatformInstallURL: cheerio('.app-buttons a:nth-of-type(3)', this).attr('href'),
									},
								},
							};
						});
					},
				}[item],
			});
		}, {})[param1]()).map(require('OLSKObject').OLSKObjectTrim);
	},

	DataListingProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataListingObjects(item, _mod._ValueItemsCache[item] || ''));
		}, []).reduce(function (coll, item) {
			if (coll.urls.includes(item.EASProjectURL)) {
				const e = coll.objects.filter(function (e) {
					return e.EASProjectURL === item.EASProjectURL;
				}).shift();
				
				Object.assign(e, Object.assign(item, e));

				return coll;
			}

			coll.urls.push(item.EASProjectURL);
			coll.objects.push(item);

			return coll;
		}, {
			urls: [],
			objects: [],
		}).objects;
	},

	// SETUP

	_SetupMethods () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return Object.keys(_mod).filter(function (e) {
			return e.match(/^Setup/);
		});
	},

	SetupFetchQueue () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod._ValueFetchQueue = _mod._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	SetupItemsCache () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		Object.assign(mod, Object.assign(_mod, {
			_ValueItemsCache: mod.DataListingURLs().reduce(function (coll, item) {
				return Object.assign(coll, {
					[item]: _mod._DataFoilOLSKDisk.OLSKDiskRead(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(item))),
				});
			}, {}),
		}));
	},

	_SetupItem (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		return _mod._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _mod._ValueItemsCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _mod._DataFoilOLSKDisk.OLSKDiskWrite(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(inputData)), _mod._ValueItemsCache[inputData]);
			}),
		});
	},

	SetupItems () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return Promise.all(mod.DataListingURLs().map(_mod._SetupItem));
	},

	// LIFECYCLE

	LifecycleModuleDidLoad () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return uSerial2(_mod._SetupMethods().map(function (e) {
			return _mod[e];
		}));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	mod.LifecycleModuleDidLoad();
}

Object.assign(exports, mod);
