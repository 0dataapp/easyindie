const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('EASGlance_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it.skip('localizes title', function() {
			return browser.assert.text('title', uLocalized('EASVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			return browser.assert.attribute('meta[name=description]', 'content', uLocalized('EASVitrineDescription'));
		});

		it('localizes EASGlanceRootLink', function () {
			return browser.assert.attribute(EASGlanceRootLink, 'title', uLocalized('OLSKRootLinkTextHome'));
		});

		it('localizes EASGlanceFilterInput', function () {
			return browser.assert.attribute(EASGlanceFilterInput, 'placeholder', uLocalized('EASGlanceFilterInputText'));
		});

	});

});
