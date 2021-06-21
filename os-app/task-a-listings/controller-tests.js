const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import OLSKCache from 'OLSKCache';

describe('DataListingURLs', function test_DataListingURLs() {

	it('returns array', function () {
		deepEqual(mod.DataListingURLs(), process.env.EAS_VITRINE_LISTING_URLS.split(','));
	});

});

describe('DataListingURLCloudron', function test_DataListingURLCloudron() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLCloudron(), mod.DataListingURLs().filter(function (e) {
			return e.match(/Cloudron/i);
		}).shift());
	});

});

describe('DataListingURLYunohost', function test_DataListingURLYunohost() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLYunohost(), mod.DataListingURLs().filter(function (e) {
			return e.match(/Yunohost/i);
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

	context('Cloudron', function test_Cloudron () {

		const uListing = function (inputData = {}) {
			const item = Object.assign({
				EASProjectName: Math.random().toString(),
				EASProjectBlurb: Math.random().toString(),
				EASProjectURL: Math.random().toString(),
				EASProjectImageURL: Math.random().toString(),
				EASProjectTags: Array.from(Array(uRandomInt(5))).map(function () {
					return Math.random().toString();
				}),
				EASPlatformDocsPath: Math.random().toString(),
			}, inputData);

			return `$scope.allApps = [{"id":"com.electerious.ackee","creationDate":"2021-02-22T22:59:39.000Z","publishState":"approved","ownerId":"bfa555ee-8db7-4027-94f6-7409feafd4cb","userId":"bfa555ee-8db7-4027-94f6-7409feafd4cb","visibility":"listed","releaseState":"stable","ts":"2021-02-22T23:02:27.000Z","manifest":{"id":"com.electerious.ackee","version":"1.0.0","title":"${ item.EASProjectName }","author":"Ackee Community","description":"This app packages Ackee <upstream>3.0.5</upstream>\\n\\nAckee is a self-hosted analytics tool that cares about privacy. We believe that you don't need to track every aspect of your visitors. Ackee keeps tracked data anonymized to avoid that users are identifiable, while still providing helpful insights. It's the right tool for everyone who doesn't need a full-featured marketing analytics platform like Google Analytics or Matomo.\\n\\n## Features\\n\\n* Self-hosted: Ackee runs on your own server and is 100% open-source\\n* Modern technologies: Lightweight Node.js and MongoDB architecture\\n* Beautiful: Minimal and focused interface\\n* No cookies: No unique user tracking and therefore no required cookie message\\n* Events: Track button clicks, newsletter subscriptions and more\\n* GraphQL API: Fully documented GraphQL API that allows you to build new tools upon Ackee\\n\\n","tagline":"${ item.EASProjectBlurb }","website":"${ item.EASProjectURL }","icon":"file://logo.png","mediaLinks":["https://screenshots.cloudron.io/com.electerious.ackee/1.png"],"healthCheckPath":"/","httpPort":3000,"addons":{"localstorage":{},"mongodb":{}},"contactEmail":"support@cloudron.io","tags":${ JSON.stringify(item.EASProjectTags) },"changelog":"* Initial stable version\\n* Update Ackee to 3.0.5\\n* [Full changelog](https://github.com/electerious/Ackee/releases/tag/v3.0.5)\\n","postInstallMessage":"This app is pre-setup with an admin account.\\n\\n**Username**: admin<br/>\\n**Password**: changeme<br/>\\n\\nPlease change the admin email and password credentials immediately by editing \`/app/data/env\`\\nand restarting the app.\\n\\n","documentationUrl":"${ item.EASPlatformDocsPath }","forumUrl":"https://forum.cloudron.io/category/125/ackee","minBoxVersion":"5.3.0","manifestVersion":2,"dockerImage":"cloudron/com.electerious.ackee:20210222-173644-5145b0590","memoryLimit":256,"richDescription":"<p>This app packages Ackee <upstream>3.0.5</upstream></p>\\n<p>Ackee is a self-hosted analytics tool that cares about privacy. We believe that you don&#39;t need to track every aspect of your visitors. Ackee keeps tracked data anonymized to avoid that users are identifiable, while still providing helpful insights. It&#39;s the right tool for everyone who doesn&#39;t need a full-featured marketing analytics platform like Google Analytics or Matomo.</p>\\n<h2 id=\\"features\\">Features</h2>\\n<ul>\\n<li>Self-hosted: Ackee runs on your own server and is 100% open-source</li>\\n<li>Modern technologies: Lightweight Node.js and MongoDB architecture</li>\\n<li>Beautiful: Minimal and focused interface</li>\\n<li>No cookies: No unique user tracking and therefore no required cookie message</li>\\n<li>Events: Track button clicks, newsletter subscriptions and more</li>\\n<li>GraphQL API: Fully documented GraphQL API that allows you to build new tools upon Ackee</li>\\n</ul>\\n"},"featured":false,"iconUrl":"${ item.EASProjectImageURL }","ranking":49,"installCount":49,"creationDateSortable":"20210222230200","creationDatePretty":"22 Feb 2021","version":"3.0.5","changes":["<p>Initial stable version</p>\\n","<p>Update Ackee to 3.0.5</p>\\n","<p><a href=\\"https://github.com/electerious/Ackee/releases/tag/v3.0.5\\">Full changelog</a></p>\\n"]}];
    $scope.apps = null;`;
		};
		
		it('parses listing', function () {
			const EASProjectName = Math.random().toString();
			const EASProjectBlurb = Math.random().toString();
			const EASProjectURL = Math.random().toString();
			const EASProjectTags = Array.from(Array(uRandomInt(5))).map(function () {
				return Math.random().toString();
			});
			const EASPlatformDocsPath = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLCloudron(), uListing({
				EASProjectName,
				EASProjectBlurb,
				EASProjectURL,
				EASProjectTags,
				EASPlatformDocsPath,
			})), [{
				EASProjectName,
				EASProjectBlurb,
				EASProjectURL,
				EASProjectTags,
				EASProjectPlatforms: {
					EASPlatformCloudron: {
						EASPlatformDocsPath,
					},
				},
			}]);
		});
	
	});

	context('Yunohost', function test_Yunohost () {

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
	
	});

});

describe('DataListingProjects', function test_DataListingProjects() {
	
	const _DataListingProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCacheObject: {},
			_DataListingObjects: (function () {}),
		}, inputData).DataListingProjects();
	};

	it('calls _DataListingObjects', function () {
		const item = [];

		const _ValueCacheObject = mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataListingProjects({
			_ValueCacheObject,
			_DataListingObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.DataListingURLs().map(function (e) {
			return [e, _ValueCacheObject[e]];
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

	it('trims properties', function () {
		const item = Math.random().toString();
		deepEqual(_DataListingProjects({
			_DataListingObjects: (function () {
				return [{
					[item]: ' ' + item + ' ',
				}];
			}),
		}), [{
			[item]: item,
		}]);
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

describe('SetupListingsCache', function test_SetupListingsCache() {

	const _SetupListingsCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskRead: (function () {}),
			}, inputData),
		});
		return _mod.SetupListingsCache() || _mod;
	};

	it('calls OLSKDiskRead', function () {
		const items = [];

		_SetupListingsCache({
			OLSKDiskRead: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, mod.DataListingURLs().map(OLSKCache.OLSKCacheURLBasename).map(function (e) {
			return OLSKCache.OLSKCachePath(__dirname, e);
		}));
	});

	it('sets _ValueCacheObject', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupListingsCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueCacheObject, mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: OLSKDiskRead,
			});
		}, {}));
	});

});

describe('_SetupListing', function test__SetupListing() {

	const __SetupListing = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupListing(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueCacheObject = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupListing({
			url,
			_ValueCacheObject,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueCacheObject,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupListing({
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
			
			deepEqual(await __SetupListing({
				url,
				_ValueCacheObject: {
					[url]: data,
				},
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKDiskWrite: (function () {
					return [...arguments];
				}),
			}), [OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(url)), data]);
		});
	
	});

});

describe('SetupListings', function test_SetupListings() {

	const _SetupListings = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_SetupListing: (function () {}),
		}, inputData).SetupListings();
	};

	it('calls _SetupListing', async function () {
		deepEqual(await _SetupListings({
			_SetupListing: (function (e) {
				return e;
			}),
		}), mod.DataListingURLs());
	});

});
