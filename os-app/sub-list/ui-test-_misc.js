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

	describe('EASGlanceListHead', function test_EASGlanceListHead () {

		it('classes OLSKStickyHeader', function () {
			browser.assert.hasClass(EASGlanceListHead, 'OLSKStickyHeader');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EASGlanceListHead, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('EASGlanceListHeadName', function test_EASGlanceListHeadName () {

		it('classes EASGlanceListSort', function () {
			browser.assert.hasClass(EASGlanceListHeadName, 'EASGlanceListSort');
		});

		it('sets data-sort', function () {
			browser.assert.attribute(EASGlanceListHeadName, 'data-sort', 'EASGlanceListItemName')
		});

	});

	describe('EASGlanceListItemIcon', function test_EASGlanceListItemIcon () {

		it('sets href', function () {
			browser.assert.attribute(EASGlanceListItemIcon, 'href', item.EASProjectURL);
		});

		it('sets aria-hidden', function () {
			browser.assert.attribute(EASGlanceListItemIcon, 'aria-hidden', 'true');
		});

		it('sets tabindex', function () {
			browser.assert.attribute(EASGlanceListItemIcon, 'tabindex', '-1');
		});

	});

	describe('EASGlanceListItemIconImage', function test_EASGlanceListItemIconImage () {

		it('sets src', function () {
			browser.assert.attribute(EASGlanceListItemIconImage, 'src', item._EASProjectIconURLCachedPath || item.EASProjectIconURL || '/_shared/__external/OLSKUIAssets/_OLSKSharedIconPlaceholder.svg');
		});

	});

	describe('EASGlanceListItemName', function test_EASGlanceListItemName () {

		it('sets href', function () {
			browser.assert.attribute(EASGlanceListItemName, 'href', item.EASProjectURL);
		});

		it('sets target', function () {
			browser.assert.attribute(EASGlanceListItemName, 'target', '_blank');
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
