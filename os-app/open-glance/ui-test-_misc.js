const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EASGlance_Misc', function () {

	const count = Math.min(2, uRandomInt(10));

	const item = {
		EASProjectID: Math.random().toString(),
		EASProjectName: Math.random().toString(),
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EASGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e, i) {
				return Object.assign(i ? {
					EASProjectID: Math.random().toString(),
					EASProjectName: Math.random().toString(),
				} : item, {
					EASProjectBlurb: i.toString(),
				});
			})),
		});
	});

	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	describe('EASGlance', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EASGlance, 'OLSKDecor');
		});
	
	});

	describe('EASGlanceHeader', function test_EASGlanceHeader () {

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EASGlanceHeader, 'OLSKCommonEdgeBottom');
		});

		it('classes OLSKDecorFixedHeader', function () {
			browser.assert.hasClass(EASGlanceHeader, 'OLSKDecorFixedHeader');
		});
	
	});

	describe('EASGlanceRootLink', function test_EASGlanceRootLink () {

		it('sets href', function () {
			browser.assert.attribute(EASGlanceRootLink, 'href', require('../open-vitrine/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});
	
	});

	describe('EASGlanceRootLinkImage', function test_EASGlanceRootLinkImage () {

		it('sets src', function () {
			browser.assert.attribute(EASGlanceRootLinkImage, 'src', process.env.EAS_VITRINE_IDENTITY_URL);
		});
	
	});

	describe('EASGlanceFilterInput', function test_EASGlanceFilterInput () {

		it('sets accesskey', function () {
			browser.assert.attribute(EASGlanceFilterInput, 'accesskey', 'f');
		});

		it('classes OLSKDecorInput', function () {
			browser.assert.hasClass(EASGlanceFilterInput, 'OLSKDecorInput');
		});

		context('input', function () {
			
			before(function () {
				browser.assert.elements('.EASGlanceListItem', count);
			});

			before(function () {
				browser.fill(EASGlanceFilterInput, item.EASProjectName);
			});

			it.skip('filters list', function () {
				browser.assert.elements('.EASGlanceListItem', 1);
			});
		
		});

		context('Escape', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('filters list', function () {
				browser.assert.elements('.EASGlanceListItem', count);
			});

			it('sets filter text', function () {
				browser.assert.text(EASGlanceFilterInput, '');
			});
		
		});
	
	});

	describe('EASGlanceProjectsCompilationLink', function test_EASGlanceProjectsCompilationLink () {
		
		it('sets href', function () {
			browser.assert.attribute(EASGlanceProjectsCompilationLink, 'href', require('../api-projects/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});

		it('sets text', function () {
			browser.assert.text(EASGlanceProjectsCompilationLink, 'JSON');
		});
	
	});

	describe.skip('EASGlanceListSort', function test_EASGlanceListSort () {

		before(function () {
			browser.assert.text('.EASGlanceListItem:first-of-type .EASGlanceListItemName', item.EASProjectName);
		});

		before(function () {
			return browser.click('.EASGlanceListHeadName');
		});

		it.skip('sorts list', function () {
			browser.assert.text('.EASGlanceListItem:first-of-type .EASGlanceListItemName', count);
		});
	
	});

});
