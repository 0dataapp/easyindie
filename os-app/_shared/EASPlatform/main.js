const mod = {

	EASPlatformURLs() {
		return process.env.EAS_TASK_BANKS_URLS.split(',');
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

	EASPlatformURLAwesome () {
		return mod.EASPlatformURLs().filter(function (e) {
			return e.match(/Awesome/i);
		}).shift();
	},

	EASPlatformSystemProperties () {
		return mod.EASPlatformURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[{
					[mod.EASPlatformURLCloudron()]: 'EASPlatformCloudron',
					[mod.EASPlatformURLCaprover()]: 'EASPlatformCaprover',
					[mod.EASPlatformURLYunohost()]: 'EASPlatformYunohost',
					[mod.EASPlatformURLAwesome()]: 'EASPlatformAwesome',
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
					[mod.EASPlatformURLAwesome()]: {},
				}[item],
			});
		}, {});
	},

};

Object.assign(exports, mod);
