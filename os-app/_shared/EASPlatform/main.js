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

};

Object.assign(exports, mod);
