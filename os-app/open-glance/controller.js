const cheerio = require('cheerio');
const { JSDOM } = require('JSDOM');
const OLSKLink = require('OLSKLink');
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

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/glance',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'EASGlanceRoute',
			OLSKRouteFunction: (function EASGlanceRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), res.locals.OLSK_SPEC_UI() ? Object.assign({
					EASGlanceListData: [{}],
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'EASGlanceListData') {
						e[1] = JSON.parse(e[1]);
					}

					return e;
				}))) : {
					EASGlanceListData: mod.DataProjects(),
				});
			}),
			OLSKRouteLanguageCodes: ['en'],
		}, {
			OLSKRoutePath: '/projects.json',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'EASProjectsJSONRoute',
			OLSKRouteFunction: (function EASProjectsJSONRoute (req, res, next) {
				return res.send(mod.DataProjectsJSON());
			}),
		}];
	},

	OLSKControllerSharedLocals () {
		return {
			EASGlanceProjectsCount () {
				return mod.DataListingProjects().length;
			},
			EASGlanceProjectsSourceURLs: mod.DataListingURLs()
		}
	},

	_ValueListingsCache: {},
	_ValueCandidatesCache: {},

	// DATA

	_DataFoilOLSKCache: require('OLSKCache'),
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilFS: require('fs'),

	async _DataContentString (inputData) {
		return (await require('node-fetch')(inputData)).text();
	},

	async _DataContentImage (url, file) {
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

	// * CACHE

	DataCacheNameListings() {
		return 'cache-a-listings';
	},

	DataCacheNameDetails() {
		return 'cache-b-details';
	},

	DataCacheFilenameImage (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		const extension = require('path').extname(inputData).split('?').shift();

		return OLSKCache.OLSKCacheURLBasename(inputData) + extension;
	},

	DataCachePathListings (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', mod.DataCacheNameListings(), inputData);
	},

	DataCachePathDetails (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', mod.DataCacheNameDetails(), inputData);
	},

	DataCachePathImages () {
		return require('path').join(__dirname, '__cached', 'ui-assets');
	},

	DataCacheImageLocalPath (inputData) {
		const localURL = require('path').join(mod.DataCachePathImages(), mod.DataCacheFilenameImage(inputData));
		return this._DataFoilFS.existsSync(localURL) ? localURL.replace(require('path').join(__dirname, '../'), '/') : null;
	},

	// * LISTING

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
		const _this = this;
		return mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat(_this._DataListingObjects(item, _this._ValueListingsCache[item] || ''));
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

	// * DETAILS

	_DataDetailsDOMPropertyCandidates (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof params.ParamURL !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof params.ParamMetadata !== 'object' || params.ParamMetadata === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof params.ParamManifest !== 'undefined') {
			if (typeof params.ParamManifest !== 'object' || params.ParamManifest === null) {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		return [
			['EASProjectIconURL', (function(href) {
				if (!href) {
					return;
				}

				return !href ? null : OLSKLink.OLSKLinkRelativeURL(params.ParamURL, href);
			})((((params.ParamManifest || {}).icons || []).pop() || {}).src || params.ParamMetadata['apple-touch-icon'] || params.ParamMetadata['apple-touch-icon-precomposed'])],
			['_EASProjectBlurb', params.ParamMetadata.description],
			['_EASProjectBlurb', params.ParamMetadata.title],
			['EASProjectHasManifest', !!params.ParamManifest],
		].filter(function ([key, value]) {
			return !!value;
		});
	},

	// * PROJECTS

	DataProjectsSort (a, b) {
		const unmatched = [
			'EASProjectIconURL',
			'EASProjectBlurb',
			'EASProjectHasManifest',
		].filter(function (e) {
			return a[e] !== b[e];
		});

		if (unmatched.length) {
			return uDescending(unmatched.reduce(function (coll, item) {
				return coll + !!a[item];
			}, 0), unmatched.reduce(function (coll, item) {
				return coll + !!b[item];
			}, 0));
		}

		return 0;
	},

	_DataProjectImageProperty (inputData) {
		const _this = this;

		if (inputData.EASProjectIconURL) {
			inputData._EASProjectIconURLCachedPath = _this.DataCacheImageLocalPath(inputData.EASProjectIconURL);
		}

		return inputData;
	},

	_DataProjectProperties (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		return Object.entries(this._ValueCandidatesCache[inputData.EASProjectURL] || {}).reduce(function (coll, [key, value]) {
			if (key.startsWith('_') && coll[key.slice(1)]) {
				return coll;
			}

			if (key.startsWith('_')) {
				key = key.slice(1);
			}

			return Object.assign(coll, {
				[key]: value,
			});
		}, inputData);
	},

	DataProjects () {
		const _this = this;
		return _this.DataListingProjects().map(function (e) {
			return _this._DataProjectProperties(e);
		}).map(function (e) {
			return _this._DataProjectImageProperty(e);
		}).sort(mod.DataProjectsSort);
	},

	// * JSON

	DataProjectJSONSchema (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EASErrorInputNotValid');
		}

		return Object.entries({
			EASProjectName: 'name',
			EASProjectBlurb: 'description',
			EASProjectURL: 'url',
			EASProjectIconURL: 'image',
		}).reduce(function (coll, item) {
			return !inputData[item[0]] ? coll : Object.assign(coll, {
				[item[1]]: inputData[item[0]],
			});
		}, {});
	},

	DataProjectsJSON () {
		return JSON.stringify(this.DataProjects().map(mod.DataProjectJSONSchema));
	},

	// SETUP

	_SetupMethods () {
		return Object.keys(this).filter(function (e) {
			return e.match(/^Setup/);
		});
	},

	SetupFetchQueue () {
		if (!this._DataFoilOLSKQueue) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}
		
		this._ValueFetchQueue = this._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	SetupListingsCache () {
		const _this = this;
		Object.assign(mod, Object.assign(this, {
			_ValueListingsCache: mod.DataListingURLs().reduce(function (coll, item) {
				return Object.assign(coll, {
					[item]: _this._DataFoilOLSKDisk.OLSKDiskRead(mod.DataCachePathListings(OLSKCache.OLSKCacheURLBasename(item))),
				});
			}, {}),
		}));
	},

	_SetupListing (inputData) {
		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this._ValueListingsCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _this._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKDisk.OLSKDiskWrite(mod.DataCachePathListings(OLSKCache.OLSKCacheURLBasename(inputData)), _this._ValueListingsCache[inputData]);
			}),
		});
	},

	SetupListings () {
		return Promise.all(mod.DataListingURLs().map(this._SetupListing));
	},

	SetupDetailsCache () {
		Object.assign(mod, Object.assign(this, {
			_ValueCandidatesCache: this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')) || {},
		}));
	},

	async _SetupDetailCandidates (inputData) {
		const _this = this;

		const ParamMetadata = require('OLSKDOM').OLSKDOMMetadata(_this._DataFoilOLSKDisk.OLSKDiskWrite(mod.DataCachePathDetails(OLSKCache.OLSKCacheURLBasename(inputData)), await _this._DataContentString(inputData)), {
			JSDOM: JSDOM.fragment,
		});

		return Object.fromEntries(_this._DataDetailsDOMPropertyCandidates({
			ParamURL: inputData,
			ParamMetadata,
			ParamManifest: !ParamMetadata.manifest ? undefined : (function(body) {
				try {
					return JSON.parse(_this._DataFoilOLSKDisk.OLSKDiskWrite(mod.DataCachePathDetails(OLSKCache.OLSKCacheURLBasename(OLSKLink.OLSKLinkRelativeURL(inputData, ParamMetadata.manifest))), body));
				} catch (error) {
					return;
				}
			})(await _this._DataContentString(OLSKLink.OLSKLinkRelativeURL(inputData, ParamMetadata.manifest))),
		}));
	},

	_SetupDetail (inputData) {
		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this._ValueCandidatesCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _this._ValueFetchQueue.OLSKQueueAdd(function () {
					return _this._SetupDetailCandidates(inputData);
				});
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueCandidatesCache, mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached'));
			}),
		});
	},

	SetupDetails () {
		const _this = this;
		return this.DataListingProjects().map(function (e) {
			return _this._SetupDetail(e.EASProjectURL);
		})
	},

	_SetupImage (inputData) {
		const _this = this;
		return _this._ValueFetchQueue.OLSKQueueAdd(function () {
			return _this._DataContentImage(inputData, require('path').join(mod.DataCachePathImages(), mod.DataCacheFilenameImage(inputData)));
		});
	},

	SetupImages () {
		const _this = this;
		return _this.DataProjects().filter(function (e) {
			return e.EASProjectIconURL && !e._EASProjectIconURLCachedPath;
		}).map(function (e) {
			return _this._SetupImage(e.EASProjectIconURL);
		});
	},

	// LIFECYCLE

	LifecycleModuleDidLoad () {
		const _this = this;
		
		return uSerial2(_this._SetupMethods().map(function (e) {
			return _this[e];
		}));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	mod.LifecycleModuleDidLoad();
}

Object.assign(exports, mod);
