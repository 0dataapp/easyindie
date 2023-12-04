const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('EASVitrine_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it.skip('localizes title', async function() {
			return browser.assert.text('title', uLocalized('EASVitrineDescription'));
		});

		it('localizes meta[description]', function() {
			return browser.assert.attribute('meta[name=description]', 'content', uLocalized('EASVitrineDescription'));
		});

		it('localizes EASVitrinePlatformsHeading', function () {
			return browser.assert.text(EASVitrinePlatformsHeading, uLocalized('EASVitrinePlatformsHeadingText'));
		});

		it('localizes EASVitrinePlatformsBlurb', function () {
			return browser.assert.text(EASVitrinePlatformsBlurb, uLocalized('EASVitrinePlatformsBlurbText'));
		});

		it('localizes EASVitrineDiscussingHeading', function () {
			return browser.assert.text(EASVitrineDiscussingHeading, uLocalized('EASVitrineDiscussingHeadingText'));
		});

		it('localizes EASVitrineAlternativesHeading', function () {
			return browser.assert.text(EASVitrineAlternativesHeading, uLocalized('EASVitrineAlternativesHeadingText'));
		});

		it('localizes EASVitrineAlsoHeading', function () {
			return browser.assert.text(EASVitrineAlsoHeading, uLocalized('EASVitrineAlsoHeadingText'));
		});

		it('localizes EASVitrineZeroDataCrownBlurb', function () {
			return browser.assert.text(EASVitrineZeroDataCrownBlurb, uLocalized('EASVitrineZeroDataCrownBlurbText'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				return browser.assert.text('.OLSKCrownCardName', uLocalized('EASVitrineTitle'));
			});
		
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				return browser.assert.OLSKInnerHTML('.OLSKLandingHeading', uLocalized('EASVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				return browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it.skip('localizes OLSKLandingActionText', function () {
				return browser.assert.text('.OLSKLandingAction', OLSKTestingFormatted(uLocalized('OLSKLandingActionTextFormat'), require('../open-glance/controller.js').OLSKControllerSharedLocals().EASGlanceProjectsCount()));
			});
		
		});

	});

});
