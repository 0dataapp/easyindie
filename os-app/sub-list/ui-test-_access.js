const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EASGlanceList: '.EASGlanceList',
	
	EASGlanceListEmpty: '.EASGlanceListEmpty',

	EASGlanceListItem: '.EASGlanceListItem',
	EASGlanceListItemIcon: '.EASGlanceListItemIcon',
	EASGlanceListItemIconImage: '.EASGlanceListItemIconImage',
	EASGlanceListItemName: '.EASGlanceListItemName',
	EASGlanceListItemBlurb: '.EASGlanceListItemBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EASGlanceList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EASGlanceList', function() {
		browser.assert.elements(EASGlanceList, 1);
	});

	it('shows EASGlanceListEmpty', function () {
		browser.assert.elements(EASGlanceListEmpty, 1);
	});

	it('hides EASGlanceListItem', function () {
		browser.assert.elements(EASGlanceListItem, 0);
	});

	context('EASGlanceListData', function () {

		const count = Math.max(1, Date.now() % 10);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EASGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e) {
					return {
						EASProjectID: Math.random().toString(),
					};
				})),
			});
		});

		it('hides EASGlanceListEmpty', function () {
			browser.assert.elements(EASGlanceListEmpty, 0);
		});

		it('shows EASGlanceListItem', function () {
			browser.assert.elements(EASGlanceListItem, count);
		});

		it('shows EASGlanceListItemIcon', function () {
			browser.assert.elements(EASGlanceListItemIcon, count);
		});

		it('shows EASGlanceListItemIconImage', function () {
			browser.assert.elements(EASGlanceListItemIconImage, count);
		});

		it('shows EASGlanceListItemName', function () {
			browser.assert.elements(EASGlanceListItemName, count);
		});

		it('shows EASGlanceListItemBlurb', function () {
			browser.assert.elements(EASGlanceListItemBlurb, count);
		});

	});

});
