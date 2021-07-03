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

	EASPlatformNames () {
		return mod.EASPlatformURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[{
					[mod.EASPlatformURLCloudron()]: 'EASPlatformCloudron',
					[mod.EASPlatformURLCaprover()]: 'EASPlatformCaprover',
					[mod.EASPlatformURLYunohost()]: 'EASPlatformYunohost',
				}[item]]: {
					[mod.EASPlatformURLCloudron()]: 'Cloudron',
					[mod.EASPlatformURLCaprover()]: 'CapRover',
					[mod.EASPlatformURLYunohost()]: 'Yunohost',
				}[item],
			});
		}, {});
	},

};

Object.assign(exports, mod);
