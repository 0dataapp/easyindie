const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('EASInstall_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				EASProjectID: Math.random().toString(),
				EASInstallData: JSON.stringify({}),
			});
		});

		it('localizes EASInstallSite', function () {
			browser.assert.text(EASInstallSite, uLocalized('EASInstallSiteText'));
		});

		it('localizes EASInstallPlatformsHeading', function () {
			browser.assert.text(EASInstallPlatformsHeading, uLocalized('EASInstallPlatformsHeadingText'));
		});

	});

});
