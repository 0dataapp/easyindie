const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import OLSKCache from 'OLSKCache';

describe('DataCachePathItems', function test_DataCachePathItems() {

	it('throws if not string', function () {
		throws(function () {
			mod.DataCachePathItems(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataCachePathItems(item), require('path').join(__dirname, '__cached', item));
	});

});

describe('DataListingURLs', function test_DataListingURLs() {

	it('returns array', function () {
		deepEqual(mod.DataListingURLs(), process.env.EAS_VITRINE_LISTING_URLS.split(','));
	});

});

describe('DataListingURLYunohost', function test_DataListingURLYunohost() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLYunohost(), mod.DataListingURLs().filter(function (e) {
			return e.match(/yunohost/);
		}).shift());
	});

});

describe('_DataListingObjects', function test__DataListingObjects() {

	it('throws if param1 not in DataListingURLs', function () {
		throws(function () {
			mod._DataListingObjects(Math.random().toString(), Math.random().toString());
		}, /EASErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataListingObjects(uRandomElement(mod.DataListingURLs()), null);
		}, /EASErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataListingObjects(uRandomElement(mod.DataListingURLs()), ''), []);
	});

	context('yunohost', function tost_yunohost () {

		const uListing = function (inputData = {}) {
			const item = Object.assign({
				EASProjectName: Math.random().toString(),
				EASProjectBlurb: Math.random().toString(),
				EASPlatformCategory: Math.random().toString(),
				EASPlatformRepoURL: Math.random().toString(),
				EASPlatformDocsPath: Math.random().toString(),
				EASPlatformInstallURL: Math.random().toString(),
			}, inputData);

			return `<div class="app-cards-list"><div class="app-card" data-appid="20euros" data-level="8"><div class="app-title"><i class="fa fa-star" style="color: gold"></i>${ item.EASProjectName } <span class="label">${ item.EASPlatformCategory }</span></div><div class="app-descr">${ item.EASProjectBlurb }</div><div class="app-footer"><div class="app-buttons"><a href="${ item.EASPlatformRepoURL }" target="_BLANK" type="button" class="btn"><i class="fa fa-code"></i>Code</a><a href="${ item.EASPlatformDocsPath }" target="_BLANK" type="button" class="btn"><i class="fa fa-book"></i> Doc </a><a href="${ item.EASPlatformInstallURL }" target="_BLANK" type="button" class="btn btn-success"><i class="fa fa-plus"></i>Install </a>`;
		};
		
		it('parses listing', function () {
			const EASProjectName = Math.random().toString();
			const EASProjectBlurb = Math.random().toString();
			const EASPlatformCategory = Math.random().toString();
			const EASPlatformRepoURL = Math.random().toString();
			const EASPlatformDocsPath = Math.random().toString();
			const EASPlatformInstallURL = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLYunohost(), uListing({
				EASProjectName,
				EASProjectBlurb,
				EASPlatformCategory,
				EASPlatformRepoURL,
				EASPlatformDocsPath,
				EASPlatformInstallURL,
			})), [{
				EASProjectName,
				EASProjectBlurb,
				EASProjectURL: EASPlatformRepoURL,
				EASProjectPlatforms: {
					EASPlatformYunohost: {
						EASPlatformCategory,
						EASPlatformRepoURL,
						EASPlatformDocsPath,
						EASPlatformInstallURL,
					},
				},
			}]);
		});
		
		it('strips whitespace', function () {
			const EASProjectName = Math.random().toString();
			const EASProjectBlurb = Math.random().toString();
			const EASProjectURL = Math.random().toString();
			const EASPlatformCategory = Math.random().toString();
			const EASPlatformRepoURL = Math.random().toString();
			const EASPlatformDocsPath = Math.random().toString();
			const EASPlatformInstallURL = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLYunohost(), uListing({
				EASProjectName: ' ' + EASProjectName + ' ',
				EASProjectBlurb: ' ' + EASProjectBlurb + ' ',
				EASPlatformCategory: ' ' + EASPlatformCategory + ' ',
				EASPlatformRepoURL: ' ' + EASPlatformRepoURL + ' ',
				EASPlatformDocsPath: ' ' + EASPlatformDocsPath + ' ',
				EASPlatformInstallURL: ' ' + EASPlatformInstallURL + ' ',
			})), [{
				EASProjectName,
				EASProjectBlurb,
				EASProjectURL: EASPlatformRepoURL,
				EASProjectPlatforms: {
					EASPlatformYunohost: {
						EASPlatformCategory,
						EASPlatformRepoURL,
						EASPlatformDocsPath,
						EASPlatformInstallURL,
					},
				},
			}]);
		});
	
	});

});

describe('DataListingProjects', function test_DataListingProjects() {
	
	const _DataListingProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueItemsCache: {},
			_DataListingObjects: (function () {}),
		}, inputData).DataListingProjects();
	};

	it('calls _DataListingObjects', function () {
		const item = [];

		const _ValueItemsCache = mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataListingProjects({
			_ValueItemsCache,
			_DataListingObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.DataListingURLs().map(function (e) {
			return [e, _ValueItemsCache[e]];
		}));
	});

	it('returns _DataListingObjects', function () {
		deepEqual(_DataListingProjects({
			_DataListingObjects: (function () {
				return [{
					EASProjectURL: arguments[0],
				}];
			}),
		}), mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat({
				EASProjectURL: item,
			});
		}, []));
	});

	it('merges if EASProjectURL duplicate', function () {
		const EASProjectURL = Math.random().toString();
		const alfa = Math.random().toString();
		const bravo = Math.random().toString();
		
		deepEqual(_DataListingProjects({
			_DataListingObjects: (function () {
				return [{
				EASProjectURL,
				alfa: alfa,
			}, {
				EASProjectURL,
				alfa: Math.random().toString(),
				bravo: bravo,
			}];
			}),
		}), [{
			EASProjectURL,
			alfa: alfa,
			bravo: bravo,
		}]);
	});

	it('passes default value if cache empty', function () {
		deepEqual(_DataListingProjects({
			_DataListingObjects: mod._DataListingObjects,
		}), []);
	});

});

describe('_SetupMethods', function test__SetupMethods() {

	it('returns array', function () {
		const signature = 'Setup' + uRandomInt();

		deepEqual(Object.assign(Object.assign({}, mod), {
			[signature]: function () {},
		})._SetupMethods(), Object.keys(mod).filter(function (e) {
			return e.match(/^Setup/);
		}).concat(signature));
	});

});

describe('SetupFetchQueue', function test_SetupFetchQueue() {

	const _SetupFetchQueue = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKQueue: inputData,
		}, inputData);
		return _mod.SetupFetchQueue() || _mod;
	};

	it('calls OLSKQueueAPI', function () {
		const item = Math.random().toString();
		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return [...arguments].concat(item);
			}),
		})._ValueFetchQueue, [item]);
	});

	it('sets _ValueFetchQueue', function () {
		const item = Math.random().toString();

		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return item;
			}),
		})._ValueFetchQueue, item);
	});

});

describe('SetupItemsCache', function test_SetupItemsCache() {

	const _SetupItemsCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskRead: (function () {}),
			}, inputData),
		});
		return _mod.SetupItemsCache() || _mod;
	};

	it('calls OLSKDiskRead', function () {
		const items = [];

		_SetupItemsCache({
			OLSKDiskRead: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, mod.DataListingURLs().map(OLSKCache.OLSKCacheURLBasename).map(mod.DataCachePathItems));
	});

	it('sets _ValueItemsCache', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupItemsCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueItemsCache, mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: OLSKDiskRead,
			});
		}, {}));
	});

});

describe('_SetupItem', function test__SetupItem() {

	const __SetupItem = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupItem(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueItemsCache = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupItem({
			url,
			_ValueItemsCache,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueItemsCache,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupItem({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				_DataContentString: (function () {
					return [...arguments];
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKDiskWrite', async function () {
			const url = uLink();
			const data = Math.random().toString();
			
			deepEqual(await __SetupItem({
				url,
				_ValueItemsCache: {
					[url]: data,
				},
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKDiskWrite: (function () {
					return [...arguments];
				}),
			}), [mod.DataCachePathItems(OLSKCache.OLSKCacheURLBasename(url)), data]);
		});
	
	});

});

describe('SetupItems', function test_SetupItems() {

	const _SetupItems = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_SetupItem: (function () {}),
		}, inputData).SetupItems();
	};

	it('calls _SetupItem', async function () {
		deepEqual(await _SetupItems({
			_SetupItem: (function (e) {
				return e;
			}),
		}), mod.DataListingURLs());
	});

});

describe('LifecycleModuleDidLoad', function test_LifecycleModuleDidLoad() {

	const _LifecycleModuleDidLoad = function (inputData = {}) {
		return Object.assign(mod._SetupMethods().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: function () {
					return item;
				},
			});
		}, Object.assign({}, mod)), inputData).LifecycleModuleDidLoad();
	};

	it('calls _SetupMethods', async function () {
		const signature = 'Setup' + uRandomInt();

		deepEqual(await _LifecycleModuleDidLoad({
			[signature]: function () {
				return signature;
			},
		}), mod._SetupMethods().concat(signature));
	});

});
