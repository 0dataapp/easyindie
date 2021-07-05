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
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_011');
		});

	});

	describe('EASVitrineZeroDataCrown', function test_EASVitrineZeroDataCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(EASVitrineZeroDataCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(EASVitrineZeroDataCrown, 'OLSKCommonCrownCard');
		});
		
	});

	describe('EASVitrineZeroDataCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(EASVitrineZeroDataCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(EASVitrineZeroDataCrownIcon, 'src', process.env.EAS_VITRINE_ZERO_DATA_IDENTITY_URL);
		});

	});

	describe('EASVitrineZeroDataCrownName', function test_EASVitrineZeroDataCrownName () {

		it('sets href', function () {
			browser.assert.attribute(EASVitrineZeroDataCrownName, 'href', process.env.EAS_VITRINE_ZERA_DATA_URL);
		});
		
		it('sets text', function () {
			browser.assert.text(EASVitrineZeroDataCrownName, 'Zero Data App');
		});
	
	});

	describe('ROCOForum', function test_ROCOForum () {

		it('sets ROCOForumTopic', function () {
			browser.assert.attribute('.ROCOForumList', 'category', process.env.ROCO_FORUM_TOPIC);
		});
	
	});

});
