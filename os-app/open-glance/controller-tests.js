const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import { JSDOM } from 'jsdom';

describe('DataRelativeURL', function test_DataRelativeURL() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod.DataRelativeURL(null, Math.random().toString());
		}, /EASErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.DataRelativeURL(Math.random().toString(), null);
		}, /EASErrorInputNotValid/);
	});

	it('returns string', function () {
		const url = 'https://example.com';
		const path = Math.random().toString();
		deepEqual(mod.DataRelativeURL(url, path), url + '/' + path);
	});

	it('returns param2 if complete', function () {
		const path = 'https://alfa.bravo/' + Math.random().toString();
		deepEqual(mod.DataRelativeURL('https://example.com', path), path);
	});

	it('completes slash', function () {
		const url = 'https://example.com';
		const path = '/' + Math.random().toString();
		deepEqual(mod.DataRelativeURL(url, path), url + path);
	});

});

describe('DataCacheNameListings', function test_DataCacheNameListings() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameListings(), 'cache-a-listings');
	});

});

describe('DataCacheNameDetails', function test_DataCacheNameDetails() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameDetails(), 'cache-b-details');
	});

});

describe('DataCacheFilenameURL', function test_DataCacheFilenameURL() {

	it('throws if not string', function () {
		throws(function () {
			mod.DataCacheFilenameURL(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns string', function () {
		const host = uRandomElement('www.example.com', 'www.alfa.bravo');
		const filename = Date.now().toString();
		const item = 'https://' + host + '/' + filename;

		deepEqual(mod.DataCacheFilenameURL(item), host.replace('www.', '') + '.' + mod._DataHash(item));
	});

});

describe('DataCacheFilenameImage', function test_DataCacheFilenameImage() {

	it('throws if not string', function () {
		throws(function () {
			mod.DataCacheFilenameImage(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns string', function () {
		const extension = '.' + uRandomElement('png', 'jpg', 'gif');
		const filename = Date.now().toString();
		const item = uLink(filename + extension);

		deepEqual(mod.DataCacheFilenameImage(item), mod.DataCacheFilenameURL(item).replace('.html', '') + extension);
	});

	it('strips query', function () {
		const extension = '.' + uRandomElement('png', 'jpg', 'gif');
		const filename = Date.now().toString();
		const item = uLink(filename + extension);
		const query = '?' + Date.now().toString();

		deepEqual(mod.DataCacheFilenameImage(item + query), mod.DataCacheFilenameURL(item + query).replace('.html', '') + extension);
	});

});

describe('DataCachePathListings', function test_DataCachePathListings() {

	it('throws if not string', function () {
		throws(function () {
			mod.DataCachePathListings(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataCachePathListings(item), require('path').join(__dirname, '__cached', mod.DataCacheNameListings(), item));
	});

});

describe('DataCachePathDetails', function test_DataCachePathDetails() {

	it('throws if not string', function () {
		throws(function () {
			mod.DataCachePathDetails(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns string', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataCachePathDetails(item), require('path').join(__dirname, '__cached', mod.DataCacheNameDetails(), item));
	});

});

describe('DataCachePathImages', function test_DataCachePathImages() {

	it('returns string', function () {
		deepEqual(mod.DataCachePathImages(), require('path').join(__dirname, '__cached', 'ui-assets'));
	});

});

describe('DataCacheImageLocalPath', function test_DataCacheImageLocalPath() {

	const _DataCacheImageLocalPath = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilFS: Object.assign({
				existsSync: (function () {}),
			}, inputData),
		}, inputData).DataCacheImageLocalPath(inputData.url || uLink());
	};

	it('calls existsSync', function () {
		const item = [];

		const url = uLink();

		_DataCacheImageLocalPath({
			url,
			existsSync: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(item, [require('path').join(mod.DataCachePathImages(), mod.DataCacheFilenameImage(url))]);
	});

	it('returns local URL if existsSync', function () {
		const url = uLink();

		deepEqual(_DataCacheImageLocalPath({
			url,
			existsSync: (function () {
				return true;
			}),
		}), require('path').join(mod.DataCachePathImages(), mod.DataCacheFilenameImage(url)).replace(require('path').join(__dirname, '../'), '/'));
	});

	it('returns null', function () {
		deepEqual(_DataCacheImageLocalPath({
			existsSync: (function () {
				return false;
			}),
		}), null);
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
			_ValueListingsCache: {},
			_DataListingObjects: (function () {}),
		}, inputData).DataListingProjects();
	};

	it('calls _DataListingObjects', function () {
		const item = [];

		const _ValueListingsCache = mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataListingProjects({
			_ValueListingsCache,
			_DataListingObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.DataListingURLs().map(function (e) {
			return [e, _ValueListingsCache[e]];
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

describe('_DataDetailsDOMPropertyCandidates', function test__DataDetailsDOMPropertyCandidates() {

	const __DataDetailsDOMPropertyCandidates = function (inputData = {}) {
		return mod._DataDetailsDOMPropertyCandidates(Object.assign({
			ParamURL: uLink(),
			ParamMetadata: {},
		}, inputData));
	};

	it('throws if not object', function () {
		throws(function () {
			mod._DataDetailsDOMPropertyCandidates(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ParamURL not string', function () {
		throws(function () {
			__DataDetailsDOMPropertyCandidates({
				ParamURL: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ParamMetadata not object', function () {
		throws(function () {
			__DataDetailsDOMPropertyCandidates({
				ParamMetadata: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(__DataDetailsDOMPropertyCandidates(), []);
	});

	it('throws if ParamManifest not object', function () {
		throws(function () {
			__DataDetailsDOMPropertyCandidates({
				ParamManifest: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	context('ParamMetadata', function () {
		
		it('extracts apple-touch-icon', function () {
			const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
			const ParamURL = 'https://example.com';
			deepEqual(__DataDetailsDOMPropertyCandidates({
				ParamMetadata: {
					'apple-touch-icon': path,
				},
				ParamURL,
			}), Object.entries({
				EASProjectIconURL: mod.DataRelativeURL(ParamURL, path),
			}));
		});

		it('extracts apple-touch-icon-precomposed', function () {
			const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
			const ParamURL = 'https://example.com';
			deepEqual(__DataDetailsDOMPropertyCandidates({
				ParamMetadata: {
					'apple-touch-icon-precomposed': path,
				},
				ParamURL,
			}), Object.entries({
				EASProjectIconURL: mod.DataRelativeURL(ParamURL, path),
			}));
		});

		it('extracts description', function () {
			const _EASProjectBlurb = Math.random().toString();
			deepEqual(__DataDetailsDOMPropertyCandidates({
				ParamMetadata: {
					'description': _EASProjectBlurb,
				},
			}), Object.entries({
				_EASProjectBlurb,
			}));
		});

		it('extracts title', function () {
			const _EASProjectBlurb = Math.random().toString();
			deepEqual(__DataDetailsDOMPropertyCandidates({
				ParamMetadata: {
					'title': _EASProjectBlurb,
				},
			}), Object.entries({
				_EASProjectBlurb,
			}));
		});
	
	});

	context('ParamManifest', function () {

		it('sets EASProjectHasManifest', function () {
			const EASProjectIconURL = uLink();
			deepEqual(__DataDetailsDOMPropertyCandidates({
				ParamManifest: {},
			}), Object.entries({
				EASProjectHasManifest: true,
			}));
		});

		it('extracts icons', function () {
			const EASProjectIconURL = uLink();
			deepEqual(__DataDetailsDOMPropertyCandidates({
				ParamManifest: {
					'icons': [{
						src: uLink(),
					}, {
						src: EASProjectIconURL,
					}],
				},
			}), Object.entries({
				EASProjectIconURL,
				EASProjectHasManifest: true,
			}));
		});
	
	});

});

describe('DataProjectsSort', function test_DataProjectsSort() {
	
	it('bumps EASProjectIconURL', function () {
		const item1 = {};
		const item2 = {
			EASProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	it('bumps EASProjectIconURL + EASProjectBlurb', function () {
		const item1 = {
			EASProjectIconURL: Math.random().toString(),
		};
		const item2 = {
			EASProjectBlurb: Math.random().toString(),
			EASProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	it('bumps EASProjectHasManifest', function () {
		const item1 = {
			EASProjectBlurb: Math.random().toString(),
			EASProjectIconURL: Math.random().toString(),
			EASProjectHasManifest: false,
		};
		const item2 = {
			EASProjectBlurb: Math.random().toString(),
			EASProjectIconURL: Math.random().toString(),
			EASProjectHasManifest: true,
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

});

describe('_DataProjectImageProperty', function test__DataProjectImageProperty() {
	
	const __DataProjectImageProperty = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
		}, inputData)._DataProjectImageProperty(inputData.ParamProject);
	};

	it('returns inputData', function () {
		const ParamProject = {
			EASProjectIconURL: uLink(),
		};
		deepEqual(__DataProjectImageProperty({
			ParamProject,
		}), ParamProject);
	});

	it('sets _EASProjectIconURLCachedPath if _DataCacheImageLocalPath', function () {
		const EASProjectIconURL = Math.random().toString();
		const DataCacheImageLocalPath = Math.random().toString();

		deepEqual(__DataProjectImageProperty({
			ParamProject: {
				EASProjectIconURL,
			},
			DataCacheImageLocalPath: (function () {
				return DataCacheImageLocalPath;
			}),
		}), {
			EASProjectIconURL,
			_EASProjectIconURLCachedPath: DataCacheImageLocalPath,
		});
	});

});

describe('_DataProjectProperties', function test__DataProjectProperties() {
	
	const __DataProjectProperties = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCandidatesCache: {},
			_DataDetailsDOMPropertyCandidates: (function () {
				return [];
			}),
		}, inputData)._DataProjectProperties(inputData.ParamProject);
	};

	it('throws if not object', function () {
		throws(function () {
			mod._DataProjectProperties(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('returns inputData', function () {
		const ParamProject = {
			EASProjectURL: Math.random().toString(),
		};
		deepEqual(__DataProjectProperties({
			ParamProject,
		}), ParamProject);
	});
	
	it('includes _ValueCandidatesCache', function () {
		const EASProjectURL = Math.random().toString();
		const ParamProject = {
			EASProjectURL,
		};
		const _ValueCandidatesCache = {
			[EASProjectURL]: {
				[Math.random().toString()]: Math.random().toString(),
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), Object.assign(ParamProject, _ValueCandidatesCache));
	});
	
	it('excludes underscore if present', function () {
		const EASProjectURL = Math.random().toString();
		const item = Math.random().toString();
		const ParamProject = {
			EASProjectURL,
			[item]: Math.random().toString(),
		};
		const _ValueCandidatesCache = {
			[EASProjectURL]: {
				['_' + item]: Math.random().toString(),
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), ParamProject);
	});
	
	it('strips underscore', function () {
		const EASProjectURL = Math.random().toString();
		const item = Math.random().toString();
		const ParamProject = {
			EASProjectURL,
		};
		const _ValueCandidatesCache = {
			[EASProjectURL]: {
				['_' + item]: item,
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), Object.assign(ParamProject, {
			[item]: item,
		}));
	});

});

describe('DataProjects', function test_DataProjects() {
	
	const _DataProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCandidatesCache: {},
			DataListingProjects: (function () {}),
		}, inputData).DataProjects();
	};

	it('merges sources', function () {
		const candidates = {
			[Math.random().toString()]: Math.random().toString(),
		};
		const EASProjectURL = Math.random().toString();
		const _EASProjectIconURLCachedPath = Math.random().toString();
		deepEqual(_DataProjects({
			_ValueCandidatesCache: {
				[EASProjectURL]: candidates,
			},
			DataListingProjects: (function () {
				return [{
					EASProjectURL,
				}];
			}),
			_DataProjectImageProperty: (function (inputData) {
				return Object.assign(inputData, {
					_EASProjectIconURLCachedPath,
				});
			}),
		}), [Object.assign({
			EASProjectURL,
		}, candidates, {
			_EASProjectIconURLCachedPath,
		})]);
	});

	it('sorts with DataProjectsSort', function () {
		const item1 = {
			EASProjectURL: Math.random().toString(),
		};
		const item2 = {
			EASProjectURL: Math.random().toString(),
			EASProjectIconURL: uLink(),
		};

		deepEqual(_DataProjects({
			DataListingProjects: (function () {
				return [item1, item2];
			}),
		}), [item2, item1]);
	});

});

describe('DataProjectJSONSchema', function test_DataProjectJSONSchema() {
	
	it('throws if not object', function () {
		throws(function () {
			mod.DataProjectJSONSchema(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mod.DataProjectJSONSchema({}), {});
	});

	it('maps EASProjectName', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectName: item,
		}), {
			name: item,
		});
	});

	it('maps EASProjectBlurb', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectBlurb: item,
		}), {
			description: item,
		});
	});

	it('maps EASProjectURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectURL: item,
		}), {
			url: item,
		});
	});

	it('maps EASProjectIconURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectIconURL: item,
		}), {
			image: item,
		});
	});

});

describe('DataProjectsJSON', function test_DataProjectsJSON() {

	it('returns string', function () {
		const EASProjectName = Math.random().toString();
		const item = {
			EASProjectName,
		};

		deepEqual(Object.assign(Object.assign({}, mod), {
			DataProjects: (function () {
				return [item];
			}),
		}).DataProjectsJSON(), JSON.stringify([mod.DataProjectJSONSchema(item)]));
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

		deepEqual(items, mod.DataListingURLs().map(mod.DataCacheFilenameURL).map(mod.DataCachePathListings));
	});

	it('sets _ValueListingsCache', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupListingsCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueListingsCache, mod.DataListingURLs().reduce(function (coll, item) {
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
		const _ValueListingsCache = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupListing({
			url,
			_ValueListingsCache,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueListingsCache,
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
				_ValueListingsCache: {
					[url]: data,
				},
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKDiskWrite: (function () {
					return [...arguments];
				}),
			}), [mod.DataCachePathListings(mod.DataCacheFilenameURL(url)), data]);
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

describe('SetupDetailsCache', function test_SetupDetailCache() {

	const _SetupDetailCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheReadFile: (function () {}),
			}, inputData),
		});
		return _mod.SetupDetailsCache() || _mod;
	};

	it('calls OLSKCacheReadFile', function () {
		const items = [];

		_SetupDetailCache({
			OLSKCacheReadFile: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, [mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')]);
	});

	it('sets _ValueCandidatesCache', function () {
		const OLSKCacheReadFile = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupDetailCache({
			OLSKCacheReadFile: (function () {
				return OLSKCacheReadFile;
			}),
		})._ValueCandidatesCache, OLSKCacheReadFile || {});
	});

});

describe('_SetupDetailCandidates', function test__SetupDetailCandidates() {

	const __SetupDetailCandidates = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {
				return inputData.ParamHTML
			}),
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {
					return [...arguments].pop();
				}),
			}, inputData),
		}, inputData)._SetupDetailCandidates(inputData.ParamURL || Math.random().toString());
	};

	it('calls _DataContentString', function () {
		const ParamURL = uLink();

		deepEqual(uCapture(function (_DataContentString) {
			__SetupDetailCandidates({
				ParamURL,
				_DataContentString,
			});
		}), [ParamURL]);
	});

	it('calls OLSKDiskWrite', async function () {
		const ParamURL = uLink();
		const ParamHTML = Math.random().toString();

		deepEqual(await new Promise(function (res) {
			return __SetupDetailCandidates({
				ParamURL,
				_DataContentString: (function () {
					return ParamHTML;
				}),
				OLSKDiskWrite: (function () {
					res([...arguments])
				}),
			});
		}), [mod.DataCachePathDetails(mod.DataCacheFilenameURL(ParamURL)), ParamHTML]);
	});

	it('returns _DataDetailsDOMPropertyCandidates', async function () {
		const ParamURL = uLink();
		const ParamHTML = `<link rel="apple-touch-icon" href="${ Math.random().toString() }" /><link rel="apple-touch-icon-precomposed" href="${ Math.random().toString() }" /><meta name="description" content="${ Math.random().toString() }"><title>${ Math.random().toString() }</title>`;
		deepEqual(await __SetupDetailCandidates({
			ParamURL,
			ParamHTML,
			_DataDetailsDOMPropertyCandidates: (function () {
				return [
					['arguments', [...arguments]],
				];
			}),
		}), {
			arguments: [{
				ParamMetadata: require('OLSKDOM').OLSKDOMMetadata(ParamHTML, {
					JSDOM: JSDOM.fragment,
				}),
				ParamURL,
				ParamManifest: undefined,
			}],
		});
	});

	context('manifest', function () {

		const ParamURL = uLink();
		const manifest = '/manifest' + Math.random().toString();
		const ParamHTML = `<link rel="manifest" href="${ manifest }" />`;
		const ParamManifest = {
			[Math.random().toString()]: Math.random().toString(),
		};
		
		it('calls _DataContentString', async function () {
			const items = [];

			await __SetupDetailCandidates({
				ParamURL,
				_DataContentString: (function () {
					items.push(...arguments);

					return ParamHTML;
				}),
			});

			deepEqual(items, [ParamURL, mod.DataRelativeURL(ParamURL, manifest)]);
		});

		it('calls OLSKDiskWrite', async function () {
			const items = [];

			await __SetupDetailCandidates({
				ParamURL,
				_DataContentString: (function (inputData) {
					return inputData === ParamURL ? ParamHTML : JSON.stringify(ParamManifest);
				}),
				OLSKDiskWrite: (function (param1, param2) {
					items.push([...arguments]);

					return param2;
				}),
			});

			deepEqual(items, [
				[mod.DataCachePathDetails(mod.DataCacheFilenameURL(ParamURL)),
				ParamHTML],
				[mod.DataCachePathDetails(mod.DataCacheFilenameURL(mod.DataRelativeURL(ParamURL, manifest))), JSON.stringify(ParamManifest)],
				]);
		});

		it('returns _DataDetailsDOMPropertyCandidates', async function () {
			deepEqual(await __SetupDetailCandidates({
				ParamURL,
				_DataContentString: (function (inputData) {
					return inputData === ParamURL ? ParamHTML : JSON.stringify(ParamManifest);
				}),
				_DataDetailsDOMPropertyCandidates: (function () {
					return [
						['arguments', [...arguments]],
					];
				}),
			}), {
				arguments: [{
					ParamMetadata: require('OLSKDOM').OLSKDOMMetadata(ParamHTML, {
						JSDOM: JSDOM.fragment,
					}),
					ParamURL,
					ParamManifest,
				}],
			});
		});
	
	});

});

describe('_SetupDetail', function test__SetupDetail() {

	const __SetupDetail = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_ValueFetchQueue: Object.assign({}, inputData),
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
				OLSKCacheWriteFile: (function () {}),
			}, inputData),
			_SetupDetailCandidates: (function () {}),
		}, inputData)._SetupDetail(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueCandidatesCache = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupDetail({
			url,
			_ValueCandidatesCache,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueCandidatesCache,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls OLSKQueueAdd', async function () {
			deepEqual(await __SetupDetail({
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				OLSKQueueAdd: (function () {
					return [...arguments].map(function (e) {
						return typeof e;
					});
				}),
			}), ['function']);
		});

		it('calls _SetupDetailCandidates', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupDetail({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				OLSKQueueAdd: (function (inputData) {
					return inputData();
				}),
				_SetupDetailCandidates: (function () {
					return [...arguments];
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKCacheWriteFile', async function () {
			const _ValueCandidatesCache = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await __SetupDetail({
				_ValueCandidatesCache,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKCacheWriteFile: (function () {
					return [...arguments];
				}),
			}), [_ValueCandidatesCache, mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')]);
		});
	
	});

});

describe('SetupDetails', function test_SetupDetail() {

	const _SetupDetails = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataListingProjects: (function () {
				return [];
			}),
			_SetupDetail: (function () {}),
		}, inputData).SetupDetails();
	};

	it('calls _SetupDetail', async function () {
		const item = {
			EASProjectURL: Math.random().toString(),
		};
		deepEqual(await _SetupDetails({
			DataListingProjects: (function () {
				return [item];
			}),
			_SetupDetail: (function () {
				return [...arguments].slice(0, 1);
			}),
		}), [[item.EASProjectURL]]);
	});

});

describe('_SetupImage', function test__SetupImage() {

	const __SetupImage = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueFetchQueue: Object.assign({}, inputData),
			_DataContentImage: (function () {}),
		}, inputData)._SetupImage(inputData.url);
	};

	it('calls OLSKQueueAdd', async function () {
		const url = uLink();

		deepEqual(await __SetupImage({
			url,
			OLSKQueueAdd: (function () {
				return [...arguments].map(function (e) {
					return typeof e;
				});
			}),
		}), ['function']);
	});

	it('calls _DataContentImage', async function () {
		const url = uLink();

		deepEqual(await __SetupImage({
			url,
			OLSKQueueAdd: (function (inputData) {
				return inputData();
			}),
			_DataContentImage: (function () {
				return [...arguments];
			}),
		}), [url, require('path').join(mod.DataCachePathImages(), mod.DataCacheFilenameImage(url))]);
	});

});

describe('SetupImages', function test_SetupImages() {

	const _SetupImages = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataProjects: (function () {
				return [];
			}),
			_SetupImage: (function () {}),
		}, inputData).SetupImages();
	};

	it('calls _SetupImage', async function () {
		const EASProjectIconURL = Math.random().toString();

		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{
					EASProjectIconURL,
				}];
			}),
			_SetupImage: (function () {
				return [...arguments];
			}),
		}), [[EASProjectIconURL]]);
	});

	it('ignores if no EASProjectIconURL', async function () {
		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{}];
			}),
		}), []);
	});

	it('ignores if already local', async function () {
		const EASProjectIconURL = Math.random().toString();
		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{
					EASProjectIconURL: Math.random().toString(),
					_EASProjectIconURLCachedPath: Math.random().toString(),
				}];
			}),
			_DataContentImage: (function () {
				return [...arguments];
			}),
		}), []);
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
