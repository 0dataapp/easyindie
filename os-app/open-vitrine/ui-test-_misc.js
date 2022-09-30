const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EASVitrine_Misc', function () {

	const platforms = require('../task-a-banks/controller.js').DataBankPlatforms();
	
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

		it('classes OLSKDecorOutline', function () {
			browser.assert.hasClass(EASVitrine, 'OLSKDecorOutline');
		});

		it('classes OLSKDecorNoTopPad', function () {
			browser.assert.hasClass(EASVitrine, 'OLSKDecorNoTopPad');
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

	platforms.forEach(function (e, i) {
		
		describe('EASVitrinePlatformsLink', function test_EASVitrinePlatformsLink() {
			
			it('sets href', function () {
				browser.assert.attribute(`${ EASVitrinePlatformsLink }:nth-of-type(${ i + 1 })`, 'href', e.EASPlatformURL);
			});

			it('sets target', function () {
				browser.assert.attribute(`${ EASVitrinePlatformsLink }:nth-of-type(${ i + 1 })`, 'target', '_blank');
			});
		
		});

		describe('EASVitrinePlatformsLinkImage', function test_EASVitrinePlatformsLinkImage() {
			
			it('sets src', function () {
				browser.assert.attribute(`${ EASVitrinePlatformsLink }:nth-of-type(${ i + 1 }) ${ EASVitrinePlatformsLinkImage }`, 'src', e._EASPlatformIconURLCachedPath || e.EASPlatformIconURL);
			});
		
		});

		describe('EASVitrinePlatformsLinkText', function test_EASVitrinePlatformsLinkText() {
			
			it('sets text', function () {
				browser.assert.text(`${ EASVitrinePlatformsLink }:nth-of-type(${ i + 1 }) ${ EASVitrinePlatformsLinkText }`, e.EASPlatformName);
			});
		
		});

	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', process.env.ROCO_SHARED_PROJECT_ID);
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
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

});
