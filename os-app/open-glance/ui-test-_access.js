const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EASGlance: '.EASGlance',

	EASGlanceHeader: '.EASGlanceHeader',

	EASGlanceRootLink: '.EASGlanceRootLink',
	EASGlanceRootLinkImage: '.EASGlanceRootLinkImage',

	EASGlanceFilterInput: '.EASGlanceFilterInput',
	
	EASGlanceProjectsCompilationLink: '.EASGlanceProjectsCompilationLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EASGlance_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EASGlance', function() {
		browser.assert.elements(EASGlance, 1);
	});

	it('shows EASGlanceHeader', function () {
		browser.assert.elements(EASGlanceHeader, 1);
	});

	it('shows EASGlanceRootLink', function () {
		browser.assert.elements(EASGlanceRootLink, 1);
	});

	it('shows EASGlanceRootLinkImage', function () {
		browser.assert.elements(EASGlanceRootLinkImage, 1);
	});

	it('shows EASGlanceFilterInput', function () {
		browser.assert.elements(EASGlanceFilterInput, 1);
	});

	it('shows EASGlanceProjectsCompilationLink', function () {
		browser.assert.elements(EASGlanceProjectsCompilationLink, 1);
	});

});
