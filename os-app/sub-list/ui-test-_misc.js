const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const EASPlatform = require('../_shared/EASPlatform/main.js');

describe('EASGlanceList_Misc', function  () {

	const keys = Object.keys(EASPlatform.EASPlatformSystemProperties());
	
	const item = {
		EASProjectID: Math.random().toString(),
		EASProjectName: Math.random().toString(),
		EASProjectBlurb: Math.random().toString(),
		EASProjectURL: Math.random().toString(),
		EASProjectIconURL: uRandomElement(undefined, Math.random().toString()),
		_EASProjectIconURLCachedPath: uRandomElement(undefined, Math.random().toString()),
		EASProjectTags: Array.from(Array(uRandomInt(10))).map(function (e) {
			return Math.random().toString();
		}),
		EASProjectPlatforms: keys.slice(0, Math.max(0, uRandomInt(keys.length))).reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: {},
			});
		}, {}),
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EASGlanceListData: JSON.stringify([item]),
		});
	});

	describe('EASGlanceList', function test_EASGlanceList () {

		it('sets lang', function () {
			browser.assert.attribute(EASGlanceList, 'lang', 'en');
		});

	});

	describe('EASGlanceListItem', function test_EASGlanceListItem () {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(EASGlanceListItem, 'OLSKCommonCard');
		});

		it('sets data-tags', function () {
			browser.assert.attribute('.EASGlanceListItem', 'data-tags', item.EASProjectTags.join(', '));
		});

		it('sets data-platforms', function () {
			browser.assert.attribute('.EASGlanceListItem', 'data-platforms', Object.keys(item.EASProjectPlatforms).map(function (e) {
				return EASPlatform.EASPlatformSystemProperties()[e].EASSystemName;
			}).join(', '));
		});

	});

	describe('EASGlanceListItemIcon', function test_EASGlanceListItemIcon () {

		it('sets href', function () {
			browser.assert.attribute(EASGlanceListItemIcon, 'href', OLSKTestingCanonical(require('../open-install/controller.js').OLSKControllerRoutes().shift(), {
				EASProjectID: item.EASProjectID,
			}));
		});

		it('sets data-tags', function () {
			browser.assert.attribute('.EASGlanceListItem', 'data-tags', item.EASProjectTags.join(', '));
		});

		it('sets data-platforms', function () {
			browser.assert.attribute('.EASGlanceListItem', 'data-platforms', Object.keys(item.EASProjectPlatforms).map(function (e) {
				return EASPlatform.EASPlatformSystemProperties()[e].EASSystemName;
			}).join(', '));
		});

	});

	describe('EASGlanceListItemIconImage', function test_EASGlanceListItemIconImageImage () {

		it('sets src', function () {
			browser.assert.attribute(EASGlanceListItemIconImage, 'src', item._EASProjectIconURLCachedPath || item.EASProjectIconURL || '/_shared/__external/OLSKUIAssets/_OLSKSharedIconPlaceholder.svg');
		});

	});

	describe('EASGlanceListItemName', function test_EASGlanceListItemName () {

		it('sets href', function () {
			browser.assert.attribute(EASGlanceListItemName, 'href', OLSKTestingCanonical(require('../open-install/controller.js').OLSKControllerRoutes().shift(), {
				EASProjectID: item.EASProjectID,
			}));
		});

		it('binds EASProjectName', function () {
			browser.assert.text(EASGlanceListItemName, item.EASProjectName);
		});

	});

	describe('EASGlanceListItemBlurb', function test_EASGlanceListItemBlurb () {

		it('binds EASProjectBlurb', function () {
			browser.assert.text(EASGlanceListItemBlurb, item.EASProjectBlurb);
		});

	});

});
