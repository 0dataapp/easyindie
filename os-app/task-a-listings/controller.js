const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');

const mod = {

	OLSKControllerSharedLocals () {
		return {
			EASGlanceProjectsCount () {
				return mod.DataListingProjects().length;
			},
			EASGlanceProjectsSourceURLs: mod.DataListingURLs(),
		}
	},

	_ValueCacheObject: {},

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

	DataListingURLCloudron () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/Cloudron/i);
		}).shift();
	},

	DataListingURLCaprover () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/Caprover/i);
		}).shift();
	},

	DataListingURLYunohost () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/Yunohost/i);
		}).shift();
	},

	_DataListingObjects (param1, param2) {
		if (!mod.DataListingURLs().includes(param1)) {
			throw new Error('EASErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		if (!param2) {
			return [];
		}

		return Array.from(mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: {
					[mod.DataListingURLCloudron()]: function () {
						return JSON.parse(param2.split('$scope.allApps = ').pop().split('$scope.apps = null;').shift().trim().slice(0, -1)).map(function (e) {
							return {
								EASProjectURL: e.manifest.website,
								EASProjectPlatforms: {
									EASPlatformCloudron: {
										EASPlatformName: e.manifest.title,
										EASPlatformBlurb: e.manifest.tagline,
										EASPlatformImageURL: e.iconUrl,
										EASPlatformTagSources: e.manifest.tags,
										EASPlatformDocsPath: e.manifest.documentationUrl,
									},
								},
							};
						});
					},
					[mod.DataListingURLCaprover()]: function () {
						return JSON.parse(param2).oneClickApps.map(function (e) {
							return {
								EASProjectPlatforms: {
									EASPlatformCaprover: {
										EASPlatformName: e.displayName,
										EASPlatformBlurb: e.description,
										EASPlatformImageURL: 'https://oneclickapps.caprover.com/v4/logos/' + e.logoUrl,
										EASPlatformID: e.name,
									},
								},
							};
						});
					},
					[mod.DataListingURLYunohost()]: function () {
						const json = JSON.parse(param2);
						const categories = json.categories;
						return Object.values(json.apps).map(function (e) {
							const category = categories.filter(function (item) {
								return item.id === e.category;
							}).shift();

							return {
								EASProjectURL: e.manifest.url,
								EASProjectPlatforms: {
									EASPlatformYunohost: Object.assign({
										EASPlatformName: e.manifest.name,
										EASPlatformBlurb: e.manifest.description.en,
									}, category ? {
										EASPlatformCategory: category.title.en,
										EASPlatformTagSources: [category.description.en].concat((category.subtags || []).filter(function (item) {
											return e.subtags.includes(item.id);
										}).map(function (e) {
											return e.title.en;
										})),
									} : {}),
								},
							};
						});
					},
				}[item],
			});
		}, {})[param1]());
	},

	_DataFilterProject (e) {
		if (e.EASProjectPlatforms && Object.values(e.EASProjectPlatforms).filter(function (e) {
			return [
				'WordPress (Developer)',
				'Anarchism',
				'Fallback server',
				'Phpinfo',
				'WemaWema',
				'ssh chroot directory',
			].includes(e.EASPlatformName);
		}).length) {
			return false;
		}

		if (e.EASProjectPlatforms && Object.values(e.EASProjectPlatforms).filter(function (e) {
			return e.EASPlatformCategory === 'Games'; 
		}).length) {
			return false;
		}

		if (e.EASProjectPlatforms && Object.values(e.EASProjectPlatforms).filter(function (e) {
			return e.EASPlatformTagSources?.includes('game') 
		}).length) {
			return false;
		}

		return true;
	},

	_DataHotfixProject (e) {
		Object.entries({
			EASProjectURL: {
				'https://element.im': 'https://element.io',
				'http://grafana.org/': 'https://grafana.com',
				'https://gitlab.com/mojo42/Jirafeau': 'https://jirafeau.net',
				'https://lycheeorg.github.io/': 'https://lychee.electerious.com',
				'https://github.com/tootsuite/mastodon': 'https://joinmastodon.org/',
				'https://github.com/opf/openproject': 'https://www.openproject.org/',
				'https://github.com/Chocobozzz/PeerTube': 'https://joinpeertube.org',
				'www.phpservermonitor.org': 'https://www.phpservermonitor.org/',
				'https://wekan.io': 'https://wekan.github.io',
				'https://github.com/YOURLS/YOURLS': 'https://yourls.org',
				'https://gitlab.com': 'https://about.gitlab.com',
				'https://git.sr.ht/~cadence/bibliogram': 'https://bibliogram.art',
			},
		}).forEach(function ([key, changes]) {
			Object.entries(changes).forEach(function ([source, destination]) {
				if (e[key] === source) {
					e[key] = destination;
				}
			});
		});
		
		return e;
	},

	_DataMergeProjects (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('EASErrorInputNotValid');
		}

		return Object.values(inputData.filter(mod._DataFilterProject).reduce(function (coll, item) {
			mod._DataHotfixProject(item);

			let id = require('OLSKLink').OLSKLinkCompareURL(item.EASProjectURL || '');

			const match = coll[id || Math.random().toString()] || (function() {
				const caprover = (item.EASProjectPlatforms || {}).EASPlatformCaprover;

				if (!caprover) {
					return;
				}

				return Object.values(coll).filter(function (e) {
					return Object.values(e.EASProjectPlatforms).filter(function (e) {
						return require('OLSKString').OLSKStringMatch(e.EASPlatformName, caprover.EASPlatformName);
					}).length;
				}).shift();
			})() || {};

			if (match.EASProjectURL) {
				id = require('OLSKLink').OLSKLinkCompareURL(item.EASProjectURL = match.EASProjectURL);
			}

			const EASProjectPlatforms = Object.assign(match.EASProjectPlatforms || {}, item.EASProjectPlatforms || {});
			
			return Object.assign(coll, {
				[id]: Object.assign(item, Object.assign(match, item), match.EASProjectPlatforms ? {
					EASProjectPlatforms,
				} : {}),
			});
		}, {}));
	},

	_DataFillProjects (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('EASErrorInputNotValid');
		}
		
		return inputData.map(function (e) {
			return Object.assign(e, Object.entries({
				EASPlatformName: 'EASProjectName',
				EASPlatformBlurb: 'EASProjectBlurb',
				EASPlatformImageURL: 'EASProjectIconURL',
			}).reduce(function (coll, [source, destination]) {
				const data = Object.values(e.EASProjectPlatforms || {}).map(function (e) {
					return e[source];
				}).filter(function (e) {
					return !!e;
				}).shift();

				if (data) {
					coll[destination] = data;
				}
				
				return coll;
			}, {}));
		});
	},

	DataListingProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFillProjects(_mod._DataMergeProjects(mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataListingObjects(item, _mod._ValueCacheObject[item] || '').map(require('OLSKObject').OLSKObjectTrim));
		}, [])));
	},

	// SETUP

	SetupFetchQueue () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod._ValueFetchQueue = _mod._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	SetupListingsCache () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		Object.assign(mod, Object.assign(_mod, {
			_ValueCacheObject: mod.DataListingURLs().reduce(function (coll, item) {
				return Object.assign(coll, {
					[item]: _mod._DataFoilOLSKDisk.OLSKDiskRead(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(item))),
				});
			}, {}),
		}));
	},

	_SetupListing (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		return _mod._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _mod._ValueCacheObject,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _mod._DataFoilOLSKDisk.OLSKDiskWrite(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(inputData)), _mod._ValueCacheObject[inputData]);
			}),
		});
	},

	SetupListings () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return Promise.all(mod.DataListingURLs().map(_mod._SetupListing));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	require('OLSKModule').OLSKModuleLifecycleSetup(mod);
}

Object.assign(exports, mod);
