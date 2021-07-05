const mod = {

	EASPlatformURLs() {
		return process.env.EAS_VITRINE_LISTING_URLS.split(',');
	},

	EASPlatformURLCloudron () {
		return mod.EASPlatformURLs().filter(function (e) {
			return e.match(/Cloudron/i);
		}).shift();
	},

	EASPlatformURLCaprover () {
		return mod.EASPlatformURLs().filter(function (e) {
			return e.match(/Caprover/i);
		}).shift();
	},

	EASPlatformURLYunohost () {
		return mod.EASPlatformURLs().filter(function (e) {
			return e.match(/Yunohost/i);
		}).shift();
	},

	EASPlatformSystemProperties () {
		return mod.EASPlatformURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[{
					[mod.EASPlatformURLCloudron()]: 'EASPlatformCloudron',
					[mod.EASPlatformURLCaprover()]: 'EASPlatformCaprover',
					[mod.EASPlatformURLYunohost()]: 'EASPlatformYunohost',
				}[item]]: {
					[mod.EASPlatformURLCloudron()]: {
						EASSystemName: 'Cloudron',
						EASSystemSetupURL: 'https://www.cloudron.io/get.html',
					},
					[mod.EASPlatformURLCaprover()]: {
						EASSystemName: 'CapRover',
						EASSystemSetupURL: 'https://caprover.com/docs/get-started.html',
					},
					[mod.EASPlatformURLYunohost()]: {
						EASSystemName: 'Yunohost',
						EASSystemSetupURL: 'https://yunohost.org/en/install',
					},
				}[item],
			});
		}, {});
	},

};

Object.assign(exports, mod);
