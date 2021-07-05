const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EASInstall: '.EASInstall',

	
	EASInstallCrown: '.EASInstallCrown',
	EASInstallCrownIcon: '.EASInstallCrownIcon',
	EASInstallCrownName: '.EASInstallCrownName',
	EASInstallCrownBlurb: '.EASInstallCrownBlurb',

	EASInstallSite: '.EASInstallSite',

	EASInstallPlatformsHeading: '.EASInstallPlatformsHeading',
	EASInstallPlatformsItem: '.EASInstallPlatformsItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EASInstall_Access', function () {

	const count = Math.max(1, uRandomInt(10));

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EASProjectID: Math.random().toString(),
			EASInstallData: JSON.stringify({
				EASProjectPlatforms: Array.from(Array(count)).reduce(function (coll) {
					return Object.assign(coll, {
						[Math.random().toString()]: {},
					});
				}, {}),
			}),
		});
	});
	
	it('shows EASInstall', function() {
		browser.assert.elements(EASInstall, 1);
	});

	it('shows EASInstallCrown', function () {
		browser.assert.elements(EASInstallCrown, 1);
	});

	it('shows EASInstallCrownIcon', function () {
		browser.assert.elements(EASInstallCrownIcon, 1);
	});

	it('shows EASInstallCrownName', function () {
		browser.assert.elements(EASInstallCrownName, 1);
	});

	it('shows EASInstallCrownBlurb', function () {
		browser.assert.elements(EASInstallCrownBlurb, 1);
	});

	it('shows EASInstallSite', function () {
		browser.assert.elements(EASInstallSite, 1);
	});

	it('shows EASInstallPlatformsHeading', function () {
		browser.assert.elements(EASInstallPlatformsHeading, 1);
	});

	it('shows EASInstallPlatformsItem', function () {
		browser.assert.elements(EASInstallPlatformsItem, count);
	});

	it('shows EASRootLink', function () {
		browser.assert.elements('.EASRootLink', 1);
	});

});
