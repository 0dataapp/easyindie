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

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('EASVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('EASVitrineDescription'));
		});

		it('localizes EASVitrinePlatformsHeading', function () {
			browser.assert.text(EASVitrinePlatformsHeading, uLocalized('EASVitrinePlatformsHeadingText'));
		});

		it('localizes EASVitrinePlatformsBlurb', function () {
			browser.assert.text(EASVitrinePlatformsBlurb, uLocalized('EASVitrinePlatformsBlurbText'));
		});

		it('localizes EASVitrineAlternativesHeading', function () {
			browser.assert.text(EASVitrineAlternativesHeading, uLocalized('EASVitrineAlternativesHeadingText'));
		});

		it('localizes EASVitrineAlsoHeading', function () {
			browser.assert.text(EASVitrineAlsoHeading, uLocalized('EASVitrineAlsoHeadingText'));
		});

		it('localizes EASVitrineZeroDataCrownBlurb', function () {
			browser.assert.text(EASVitrineZeroDataCrownBlurb, uLocalized('EASVitrineZeroDataCrownBlurbText'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				browser.assert.text('.OLSKCrownCardName', uLocalized('EASVitrineTitle'));
			});
		
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				browser.assert.OLSKInnerHTML('.OLSKLandingHeading', uLocalized('EASVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it.skip('localizes OLSKLandingActionText', function () {
				browser.assert.text('.OLSKLandingAction', OLSKTestingFormatted(uLocalized('OLSKLandingActionTextFormat'), require('../open-glance/controller.js').OLSKControllerSharedLocals().EASGlanceProjectsCount()));
			});
		
		});

	});

});
