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

		it('localizes EASVitrineInformationHeading', function () {
			browser.assert.text(EASVitrineInformationHeading, uLocalized('EASVitrineInformationHeadingText'));
		});

		it('localizes EASVitrineRepoLink', function () {
			browser.assert.text(EASVitrineRepoLink, uLocalized('EASVitrineRepoLinkText'));
		});

		it('localizes EASVitrineGazetteHeading', function () {
			browser.assert.text(EASVitrineGazetteHeading, uLocalized('OLSKGazetteHeadingText'));
		});

		it('localizes EASVitrineProjectsSourcesHeading', function () {
			browser.assert.text(EASVitrineProjectsSourcesHeading, uLocalized('EASVitrineProjectsSourcesHeadingText'));
		});

		it('localizes EASVitrineProjectsSourcesBlurb', function () {
			browser.assert.text(EASVitrineProjectsSourcesBlurb, uLocalized('EASVitrineProjectsSourcesBlurbText'));
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
