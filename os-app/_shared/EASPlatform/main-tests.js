const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('EASPlatformURLs', function test_EASPlatformURLs() {

	it('returns array', function () {
		deepEqual(mod.EASPlatformURLs(), process.env.EAS_TASK_BANKS_URLS.split(','));
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

describe('EASPlatformSystemProperties', function test_EASPlatformSystemProperties() {

	it('returns object', function () {
		deepEqual(mod.EASPlatformSystemProperties(), {
			EASPlatformCloudron: {
				EASSystemName: 'Cloudron',
				EASSystemSetupURL: 'https://www.cloudron.io/get.html',
			},
			EASPlatformCaprover: {
				EASSystemName: 'CapRover',
				EASSystemSetupURL: 'https://caprover.com/docs/get-started.html',
			},
			EASPlatformYunohost: {
				EASSystemName: 'Yunohost',
				EASSystemSetupURL: 'https://yunohost.org/en/install',
			},
		});
	});

});
