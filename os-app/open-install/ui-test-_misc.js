const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const EASPlatform = require('../_shared/EASPlatform/main.js');

describe('EASInstall_Misc', function () {

	const EASPlatformSystem = uRandomElement(Object.values(EASPlatform.EASPlatformSystemProperties()));

	const item = {
		EASProjectName: Math.random().toString(),
		EASProjectBlurb: Math.random().toString(),
		EASProjectURL: Math.random().toString(),
		_EASProjectIconURLCachedPath: Math.random().toString(),
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
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	it('sets title', function() {
		browser.assert.text('title', item.EASProjectName);
	});

	it('sets meta[description]', function() {
		browser.assert.attribute('meta[name=description]', 'content', item.EASProjectBlurb);
	});

	describe('EASInstall', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EASInstall, 'OLSKDecor');
		});
		
		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(EASInstall, 'OLSKDecorCapped');
		});
	
	});

	describe('EASInstallCrown', function test_EASInstallCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(EASInstallCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(EASInstallCrown, 'OLSKCommonCrownCard');
		});
		
	});

	describe('EASInstallCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(EASInstallCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(EASInstallCrownIcon, 'src', item._EASProjectIconURLCachedPath);
		});

	});

	describe('EASInstallCrownName', function test_EASInstallCrownName () {
		
		it('binds EASProjectName', function () {
			browser.assert.text(EASInstallCrownName, item.EASProjectName);
		});
	
	});

	describe('EASInstallCrownBlurb', function test_EASInstallCrownBlurb () {
		
		it('binds EASProjectBlurb', function () {
			browser.assert.text(EASInstallCrownBlurb, item.EASProjectBlurb);
		});
	
	});

	describe('EASInstallSite', function test_EASInstallSite () {
		
		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(EASInstallSite, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(EASInstallSite, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(EASInstallSite, 'href', item.EASProjectURL);
		});
	
	});

	describe('EASInstallContribute', function test_EASInstallContribute () {
		
		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(EASInstallContribute, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(EASInstallContribute, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(EASInstallContribute, 'href', item.EASProjectFunding[0]);
		});
	
	});

	describe('EASInstallSite', function test_EASInstallSite () {
		
		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(EASInstallSite, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(EASInstallSite, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(EASInstallSite, 'href', item.EASProjectURL);
		});
	
	});

	describe('EASInstallPlatformsItem', function test_EASInstallPlatformsItem () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(EASInstallPlatformsItem, 'OLSKDecorPress');
		});

		it('sets href', function () {
			browser.assert.attribute(EASInstallPlatformsItem, 'href', EASPlatformSystem.EASSystemSetupURL);
		});

		it('binds EASPlatformSystem.EASSystemName', function () {
			browser.assert.text(EASInstallPlatformsItem, EASPlatformSystem.EASSystemName);
		});
	
	});

});
