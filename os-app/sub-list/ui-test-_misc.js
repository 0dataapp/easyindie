const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EASGlanceList_Misc', function  () {

	const item = {
		EASProjectID: Math.random().toString(),
		EASProjectName: Math.random().toString(),
		EASProjectBlurb: Math.random().toString(),
		EASProjectURL: Math.random().toString(),
		EASProjectIconURL: uRandomElement(undefined, Math.random().toString()),
		_EASProjectIconURLCachedPath: uRandomElement(undefined, Math.random().toString()),
		_EASProjectSupportsYunohost: uRandomElement(true, false),
		EASProjectTags: Array.from(Array(uRandomInt(10))).map(function (e) {
			return Math.random().toString();
		}),
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

		it('sets href', function () {
			browser.assert.attribute(EASGlanceListItem, 'href', OLSKTestingCanonical(require('../open-install/controller.js').OLSKControllerRoutes().shift(), {
				EASProjectID: item.EASProjectID,
			}));
		});

		it('sets title', function () {
			browser.assert.attribute(EASGlanceListItem, 'title', item.EASProjectBlurb);
		});

		it('sets data-tags', function () {
			browser.assert.attribute('.list-container', 'data-tags', item.EASProjectTags.join(', '));
		});

	});

	describe('EASGlanceListItemIcon', function test_EASGlanceListItemIconImage () {

		it('sets src', function () {
			browser.assert.attribute(EASGlanceListItemIcon, 'src', item._EASProjectIconURLCachedPath || item.EASProjectIconURL || '/_shared/__external/OLSKUIAssets/_OLSKSharedIconPlaceholder.svg');
		});

	});

	describe('EASGlanceListItemName', function test_EASGlanceListItemName () {

		it('binds EASProjectName', function () {
			browser.assert.text(EASGlanceListItemName, item.EASProjectName);
		});

	});

});
