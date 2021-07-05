const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EASVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('EASVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EASVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(EASVitrine, 'OLSKDecorCapped');
		});
	
	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', process.env.EAS_VITRINE_IDENTITY_URL);
		});
	
	});

	describe('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-glance/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('EASVitrineRepoLink', function test_EASVitrineRepoLink () {
		
		it('sets href', function () {
			browser.assert.attribute(EASVitrineRepoLink, 'href', process.env.EAS_VITRINE_REPO_URL);
		});
	
	});

	describe('OLSKGazette', function test_OLSKGazette () {

		it('sets src', function () {
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_005');
		});

	});

});
