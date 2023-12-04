const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EASInstall: '.EASInstall',

	
	EASInstallCrown: '.EASInstallCrown',
	EASInstallCrownIcon: '.EASInstallCrownIcon',
	EASInstallCrownName: '.EASInstallCrownName',
	EASInstallCrownBlurb: '.EASInstallCrownBlurb',

	EASInstallSite: '.EASInstallSite',

	EASInstallContribute: '.EASInstallContribute',

	EASInstallPlatformsHeading: '.EASInstallPlatformsHeading',
	EASInstallPlatformsItem: '.EASInstallPlatformsItem',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EASInstall_Access', function () {

	const count = Math.max(1, uRandomInt(10));

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EASProjectID: Math.random().toString(),
			EASInstallData: JSON.stringify({
				EASProjectPlatforms: Array.from(Array(count)).reduce(function (coll) {
					return Object.assign(coll, {
						[Math.random().toString()]: {
							EASPlatformSystem: {},
						},
					});
				}, {}),
			}),
		});
	});
	
	it('shows EASInstall', function() {
		return browser.assert.elements(EASInstall, 1);
	});

	it('shows EASInstallCrown', function () {
		return browser.assert.elements(EASInstallCrown, 1);
	});

	it('shows EASInstallCrownIcon', function () {
		return browser.assert.elements(EASInstallCrownIcon, 1);
	});

	it('shows EASInstallCrownName', function () {
		return browser.assert.elements(EASInstallCrownName, 1);
	});

	it('shows EASInstallCrownBlurb', function () {
		return browser.assert.elements(EASInstallCrownBlurb, 1);
	});

	it('shows EASInstallSite', function () {
		return browser.assert.elements(EASInstallSite, 1);
	});

	it('hide EASInstallContribute', function () {
		return browser.assert.elements(EASInstallContribute, 0);
	});

	it('shows EASInstallPlatformsHeading', function () {
		return browser.assert.elements(EASInstallPlatformsHeading, 1);
	});

	it('shows EASInstallPlatformsItem', function () {
		return browser.assert.elements(EASInstallPlatformsItem, count);
	});

	it('shows EASRootLink', function () {
		return browser.assert.elements('.EASRootLink', 1);
	});

	context('EASProjectFunding', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EASProjectID: Math.random().toString(),
				EASInstallData: JSON.stringify({
					EASProjectFunding: [Math.random().toString()],
					EASProjectPlatforms: Array.from(Array(count)).reduce(function (coll) {
						return Object.assign(coll, {
							[Math.random().toString()]: {
								EASPlatformSystem: {},
							},
						});
					}, {}),
				}),
			});
		});
		
		it('shows EASInstallContribute', function () {
			return browser.assert.elements(EASInstallContribute, 1);
		});
	
	});

});
