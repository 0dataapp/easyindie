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
				EASInstallData: JSON.stringify({
					EASProjectFunding: [Math.random().toString()],
				}),
			});
		});

		it('localizes EASInstallSite', function () {
			return browser.assert.text(EASInstallSite, uLocalized('EASInstallSiteText'));
		});

		it('localizes EASInstallContribute', function () {
			return browser.assert.text(EASInstallContribute, uLocalized('EASInstallContributeText'));
		});

		it('localizes EASInstallPlatformsHeading', function () {
			return browser.assert.text(EASInstallPlatformsHeading, uLocalized('EASInstallPlatformsHeadingText'));
		});

	});

});
