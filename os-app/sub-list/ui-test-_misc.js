const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EASGlanceList_Misc', function  () {

	const item = {
		EASProjectName: Math.random().toString(),
		EASProjectBlurb: Math.random().toString(),
		EASProjectURL: Math.random().toString(),
		EASProjectIconURL: uRandomElement(undefined, Math.random().toString()),
		_EASProjectIconURLCachedPath: uRandomElement(undefined, Math.random().toString()),
		_EASProjectSupportsYunohost: uRandomElement(true, false),
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
			browser.assert.attribute(EASGlanceListItem, 'href', item.EASProjectURL);
		});

		it('sets target', function () {
			browser.assert.attribute(EASGlanceListItem, 'target', '_blank');
		});

		it('sets title', function () {
			browser.assert.attribute(EASGlanceListItem, 'title', item.EASProjectBlurb);
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
