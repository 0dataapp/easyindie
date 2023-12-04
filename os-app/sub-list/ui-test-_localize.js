const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('EASGlanceList_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes EASGlanceListEmpty', function () {
			return browser.assert.text(EASGlanceListEmpty, uLocalized('EASGlanceListEmptyText'));
		});

		context.skip('EASGlanceListData', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					EASGlanceListData: JSON.stringify(Array.from(Array(uRandomInt())).map(function (e) {
						return {};
					})),
					OLSKRoutingLanguage,
				});
			});

			it('localizes EASGlanceListHeadName', function () {
				return browser.assert.text(EASGlanceListHeadName, uLocalized('EASGlanceListHeadNameText'));
			});

		});

	});

});
