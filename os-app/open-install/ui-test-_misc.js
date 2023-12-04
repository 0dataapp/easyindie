const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const EASPlatform = require('../_shared/EASPlatform/main.js');

describe('EASInstall_Misc', function () {

	const EASPlatformSystem = uRandomElement(Object.values(EASPlatform.EASPlatformSystemProperties()));

	const item = {
		EASProjectName: Math.random().toString(),
		EASProjectBlurb: Math.random().toString(),
		EASProjectURL: Math.random().toString(),
		EASProjectIconURL: uRandomElement(undefined, Math.random().toString()),
		_EASProjectIconURLCachedPath: uRandomElement(undefined, Math.random().toString()),
		EASProjectFunding: [Math.random().toString(), Math.random().toString()],
		EASProjectPlatforms: {
			[Math.random().toString()]: {
				EASPlatformSystem,
			},
		},
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EASProjectID: Math.random().toString(),
			EASInstallData: JSON.stringify(item),
		});
	});

	it('sets meta:viewport', function () {
		return browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	it.skip('sets title', function() {
		return browser.assert.text('title', item.EASProjectName);
	});

	it('sets meta[description]', function() {
		return browser.assert.attribute('meta[name=description]', 'content', item.EASProjectBlurb);
	});

	describe('EASInstall', function () {
		
		it('classes OLSKDecor', function () {
			return browser.assert.hasClass(EASInstall, 'OLSKDecor');
		});
		
		it('classes OLSKDecorCapped', function () {
			return browser.assert.hasClass(EASInstall, 'OLSKDecorCapped');
		});

		it('classes OLSKDecorOutline', function () {
			return browser.assert.hasClass(EASInstall, 'OLSKDecorOutline');
		});

		it('classes OLSKDecorFormBlend', function () {
			return browser.assert.hasClass(EASInstall, 'OLSKDecorFormBlend');
		});
	
	});

	describe('EASInstallCrown', function test_EASInstallCrown() {

		it('classes OLSKCommonCard', function () {
			return browser.assert.hasClass(EASInstallCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			return browser.assert.hasClass(EASInstallCrown, 'OLSKCommonCrownCard');
		});
		
	});

	describe('EASInstallCrownIcon', function () {

		it('sets role', function () {
			return browser.assert.attribute(EASInstallCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			return browser.assert.attribute(EASInstallCrownIcon, 'src', item._EASProjectIconURLCachedPath || item.EASProjectIconURL || '/_shared/__external/OLSKUIAssets/_OLSKSharedIconPlaceholder.svg');
		});

	});

	describe('EASInstallCrownName', function test_EASInstallCrownName () {
		
		it('binds EASProjectName', function () {
			return browser.assert.text(EASInstallCrownName, item.EASProjectName);
		});
	
	});

	describe('EASInstallCrownBlurb', function test_EASInstallCrownBlurb () {
		
		it('binds EASProjectBlurb', function () {
			return browser.assert.text(EASInstallCrownBlurb, item.EASProjectBlurb);
		});
	
	});

	describe('EASInstallSite', function test_EASInstallSite () {
		
		it('classes OLSKDecorPress', function () {
			return browser.assert.hasClass(EASInstallSite, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			return browser.assert.hasClass(EASInstallSite, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			return browser.assert.attribute(EASInstallSite, 'href', item.EASProjectURL);
		});
	
	});

	describe('EASInstallContribute', function test_EASInstallContribute () {
		
		it('classes OLSKDecorPress', function () {
			return browser.assert.hasClass(EASInstallContribute, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			return browser.assert.hasClass(EASInstallContribute, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			return browser.assert.attribute(EASInstallContribute, 'href', item.EASProjectFunding[0]);
		});
	
	});

	describe('EASInstallSite', function test_EASInstallSite () {
		
		it('classes OLSKDecorPress', function () {
			return browser.assert.hasClass(EASInstallSite, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			return browser.assert.hasClass(EASInstallSite, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			return browser.assert.attribute(EASInstallSite, 'href', item.EASProjectURL);
		});
	
	});

	describe('EASInstallPlatformsItem', function test_EASInstallPlatformsItem () {

		it('classes OLSKDecorPress', function () {
			return browser.assert.hasClass(EASInstallPlatformsItem, 'OLSKDecorPress');
		});

		it.skip('sets href', function () {
			return browser.assert.attribute(EASInstallPlatformsItem, 'href', EASPlatformSystem.EASSystemSetupURL);
		});

		it('binds EASPlatformSystem.EASSystemName', function () {
			return browser.assert.text(EASInstallPlatformsItem, EASPlatformSystem.EASSystemName);
		});
	
	});

});
