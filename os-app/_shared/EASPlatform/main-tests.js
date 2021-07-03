const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('EASPlatformURLs', function test_EASPlatformURLs() {

	it('returns array', function () {
		deepEqual(mod.EASPlatformURLs(), process.env.EAS_VITRINE_LISTING_URLS.split(','));
	});

});

describe('EASPlatformURLCloudron', function test_EASPlatformURLCloudron() {

	it('returns string', function () {
		deepEqual(mod.EASPlatformURLCloudron(), mod.EASPlatformURLs().filter(function (e) {
			return e.match(/Cloudron/i);
		}).shift());
	});

});

describe('EASPlatformURLCaprover', function test_EASPlatformURLCaprover() {

	it('returns string', function () {
		deepEqual(mod.EASPlatformURLCaprover(), mod.EASPlatformURLs().filter(function (e) {
			return e.match(/Caprover/i);
		}).shift());
	});

});

describe('EASPlatformURLYunohost', function test_EASPlatformURLYunohost() {

	it('returns string', function () {
		deepEqual(mod.EASPlatformURLYunohost(), mod.EASPlatformURLs().filter(function (e) {
			return e.match(/Yunohost/i);
		}).shift());
	});

});
