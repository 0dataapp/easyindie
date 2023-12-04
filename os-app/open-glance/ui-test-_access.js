const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EASGlance: '.EASGlance',

	EASGlanceHeader: '.EASGlanceHeader',

	EASGlanceRootLink: '.EASGlanceRootLink',
	EASGlanceRootLinkImage: '.EASGlanceRootLinkImage',

	EASGlanceFilterInput: '.EASGlanceFilterInput',
	
	EASGlanceProjectsCompilationLink: '.EASGlanceProjectsCompilationLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EASGlance_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EASGlanceListData: JSON.stringify([{
				EASProjectID: Math.random().toString(),
				EASProjectName: Math.random().toString(),
				EASProjectBlurb: Math.random().toString(),
			}]),
		});
	});

	it('shows EASGlance', function() {
		return browser.assert.elements(EASGlance, 1);
	});

	it('shows EASGlanceHeader', function () {
		return browser.assert.elements(EASGlanceHeader, 1);
	});

	it('shows EASGlanceRootLink', function () {
		return browser.assert.elements(EASGlanceRootLink, 1);
	});

	it('shows EASGlanceRootLinkImage', function () {
		return browser.assert.elements(EASGlanceRootLinkImage, 1);
	});

	it('shows EASGlanceFilterInput', function () {
		return browser.assert.elements(EASGlanceFilterInput, 1);
	});

	it('shows EASGlanceProjectsCompilationLink', function () {
		return browser.assert.elements(EASGlanceProjectsCompilationLink, 1);
	});

});
