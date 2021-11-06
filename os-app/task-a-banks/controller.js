const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');
const EASPlatform = require('../_shared/EASPlatform/main.js');

const mod = {

	OLSKControllerTasks () {
		return [{
			OLSKTaskName: 'EASBanksStartFetch',
			OLSKTaskFireTimeInterval: 1,
			OLSKTaskShouldBePerformed () {
				return true;
			},
			OLSKTaskCallback: (function () {
				require('OLSKModule').OLSKModuleLifecycleSetup(mod);
			}),
			OLSKTaskFireLimit: 1,
		}];
	},

	OLSKControllerSharedLocals () {
		return {
			EASGlanceProjectsCount () {
				return mod.DataBankProjects().length;
			},
			EASPlatforms () {
				return mod.DataBankPlatforms();
			},
		}
	},

	// DATA

	_DataFoilOLSKCache: OLSKCache,
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilFS: require('fs'),
	_DataFoilImages: require('../task-c-images/controller.js'),

	async _DataContentString (inputData) {
		return (await require('node-fetch')(inputData)).text();
	},

	_DataBankObjects (param1, param2) {
		if (!EASPlatform.EASPlatformURLs().includes(param1)) {
			throw new Error('EASErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		if (!param2) {
			return [];
		}

		return Array.from(EASPlatform.EASPlatformURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: {
					[EASPlatform.EASPlatformURLCloudron()]: function () {
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
										EASPlatformCues: {
											id: e.id,
											creationDate: e.creationDate,
											publishState: e.publishState,
											visibility: e.visibility,
											releaseState: e.releaseState,
											featured: e.featured,
											ranking: e.ranking,
											installCount: e.installCount,
										},
										EASPlatformSystem: EASPlatform.EASPlatformSystemProperties().EASPlatformCloudron,
									},
								},
							};
						});
					},
					[EASPlatform.EASPlatformURLCaprover()]: function () {
						return JSON.parse(param2).oneClickApps.map(function (e) {
							return {
								EASProjectPlatforms: {
									EASPlatformCaprover: {
										EASPlatformName: e.displayName,
										EASPlatformBlurb: e.description,
										EASPlatformImageURL: 'https://oneclickapps.caprover.com/v4/logos/' + e.logoUrl,
										EASPlatformCues: {
											name: e.name,
											isOfficial: e.isOfficial,
										},
										EASPlatformSystem: EASPlatform.EASPlatformSystemProperties().EASPlatformCaprover,
									},
								},
							};
						});
					},
					[EASPlatform.EASPlatformURLYunohost()]: function () {
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
										EASPlatformCues: {
											featured: e.featured,
											high_quality: e.high_quality,
											id: e.id,
											lastUpdate: e.lastUpdate,
											level: e.level,
											maintained: e.maintained,
											multi_instance: e.manifest.multi_instance,
											state: e.state,
										},
										EASPlatformSystem: EASPlatform.EASPlatformSystemProperties().EASPlatformYunohost,
									} : {}),
								},
							};
						});
					},
					[EASPlatform.EASPlatformURLAwesome()]: function () {
						return [];
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
				'Riot',
				'LibreQR',
				'my_capsule',
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
				'https://grafana.com/oss/grafana/': 'https://grafana.com',
				'https://lycheeorg.github.io/': 'https://lychee.electerious.com',
				'https://github.com/tootsuite/mastodon': 'https://joinmastodon.org/',
				'https://github.com/opf/openproject': 'https://www.openproject.org/',
				'https://github.com/Chocobozzz/PeerTube': 'https://joinpeertube.org',
				'www.phpservermonitor.org': 'https://www.phpservermonitor.org/',
				'https://wekan.io': 'https://wekan.github.io',
				'https://github.com/YOURLS/YOURLS': 'https://yourls.org',
				'https://gitlab.com': 'https://about.gitlab.com',
				'https://git.sr.ht/~cadence/bibliogram': 'https://bibliogram.art',
				'https://meet-app.io': 'https://kopano.com/products/meet/',
				'https://asciimoo.github.io/searx/': 'https://searx.github.io/searx/',
				'https://streamaserver.org/': 'https://docs.streama-project.com',
				'www.bludit.com': 'https://www.bludit.com',
				'www.concrete5.org': 'https://www.concrete5.org',
				'www.universalmediaserver.com': 'https://www.universalmediaserver.com',
				'http://leed.idleman.fr/': 'https://github.com/LeedRSS/Leed',
				'https://distbin.com/': 'https://github.com/gobengo/distbin',
				'https://jirafeau.net': 'https://gitlab.com/mojo42/Jirafeau',
				'https://adguard.com/adguard-home.html': 'https://adguard.com/en/adguard-home/overview.html',
				'https://github.com/PrivateBin/PrivateBin': 'https://privatebin.info',
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

			if (!id) {
				return coll;
			}

			const EASProjectPlatforms = Object.assign(match.EASProjectPlatforms || {}, item.EASProjectPlatforms || {});
			
			return Object.assign(coll, {
				[id]: Object.assign(item, Object.assign(match, item), match.EASProjectPlatforms ? {
					EASProjectPlatforms,
				} : {}),
			});
		}, {}));
	},

	__DataTidyTags (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('EASErrorInputNotValid');
		}
		
		return inputData.reduce(function (coll, item) {
			return coll.concat(item.replace(/\.\.\./, '').split(/\, | \& | and | or /));
		}, []);
	},

	_DataFillProjects (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('EASErrorInputNotValid');
		}

		const ids = [];
		
		return inputData.map(function (e) {
			return Object.assign(e, Object.entries({
				EASPlatformName: 'EASProjectName',
				EASPlatformBlurb: 'EASProjectBlurb',
				EASPlatformImageURL: 'EASProjectIconURL',
				EASPlatformCategory: 'EASProjectTags',
				EASPlatformTagSources: 'EASProjectTags',
			}).reduce(function (coll, [source, destination]) {
				const raw = Object.values(e.EASProjectPlatforms || {}).map(function (e) {
					return e[source];
				}).filter(function (e) {
					return !!e;
				});
				const data = raw[0];

				if (data) {
					coll[destination] = destination === 'EASProjectTags' ? mod.__DataTidyTags((coll[destination] || []).concat(...raw)) : data;
				}
				
				return coll;
			}, {}));
		}).map(function (e) {
			return Object.assign(e, e.EASProjectName ? {
				EASProjectID: e.EASProjectName.toLowerCase().split(' ').join('-'),
			} : {});
		}).filter(function (e) {
			if (!e.EASProjectID) {
				return true;
			}

			if (ids.includes(e.EASProjectID) && (process.env.NODE_ENV !== 'production')) {
				throw new Error('EASErrorInputNotValid');
			}

			ids.push(e.EASProjectID);

			return true;
		});
	},

	DataBankProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFillProjects(_mod._DataMergeProjects(EASPlatform.EASPlatformURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataBankObjects(item, _mod._OLSKCacheResultMap[item] || '').map(require('OLSKObject').OLSKObjectTrim));
		}, [])));
	},

	_DataBankPlatformObjects (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EASErrorInputNotValid');
		}

		return Array.from(cheerio('table', inputData.split('# Easy Indie Platforms').pop().split('#').shift().trim()).first().find('tr').map(function () {
			return {
				EASPlatformURL: cheerio('a', this).attr('href'),
				EASPlatformName: cheerio('a', this).text().trim(),
				EASPlatformIconURL: cheerio('img', this).attr('src'),
			};
		}));
	},

	DataBankPlatforms () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		if (process.env.OLSK_SPEC_MOCHA_INTERFACE) {
			mod.SetupBanks();
		}

		return _mod._DataBankPlatformObjects(_mod._OLSKCacheResultMap[EASPlatform.EASPlatformURLAwesome()]).map(function (e) {
			return Object.assign(e, {
				_EASPlatformIconURLCachedPath: _mod._DataFoilImages.DataCacheLocalPath(e.EASPlatformIconURL),
			});
		});
	},

	// SETUP

	_SetupBank (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilOLSKCache.OLSKCacheQueuedFetch({
			ParamMod: mod,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			ParamFileURLs: EASPlatform.EASPlatformURLs(),
			ParamFileDirectory: __dirname,
			OLSKQueue: _mod._DataFoilOLSKQueue,
			OLSKDisk: _mod._DataFoilOLSKDisk,
		});
	},

	SetupBanks () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return Promise.all(EASPlatform.EASPlatformURLs().map(_mod._SetupBank));
	},

};

Object.assign(exports, mod);
