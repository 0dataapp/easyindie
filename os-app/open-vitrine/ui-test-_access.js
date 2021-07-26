const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	EASVitrine: '.EASVitrine',
	
	EASVitrineAlsoHeading: '.EASVitrineAlsoHeading',
	EASVitrineZeroDataCrown: '.EASVitrineZeroDataCrown',
	EASVitrineZeroDataCrownIcon: '.EASVitrineZeroDataCrownIcon',
	EASVitrineZeroDataCrownName: '.EASVitrineZeroDataCrownName',
	EASVitrineZeroDataCrownBlurb: '.EASVitrineZeroDataCrownBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EASVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows EASVitrine', function() {
		browser.assert.elements(EASVitrine, 1);
	});
	
	it('shows OLSKCrown', function() {
		browser.assert.elements('.OLSKCrown', 1);
	});
	
	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKJar', function () {
		browser.assert.elements('.OLSKJar', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows EASVitrineAlsoHeading', function () {
		browser.assert.elements(EASVitrineAlsoHeading, 1);
	});

	it('shows EASVitrineZeroDataCrown', function () {
		browser.assert.elements(EASVitrineZeroDataCrown, 1);
	});

	it('shows EASVitrineZeroDataCrownIcon', function () {
		browser.assert.elements(EASVitrineZeroDataCrownIcon, 1);
	});

	it('shows EASVitrineZeroDataCrownName', function () {
		browser.assert.elements(EASVitrineZeroDataCrownName, 1);
	});

	it('shows EASVitrineZeroDataCrownBlurb', function () {
		browser.assert.elements(EASVitrineZeroDataCrownBlurb, 1);
	});

	it('shows ROCOForum', function () {
		browser.assert.elements('.ROCOForum', 1);
	});

	it('shows ROCOEphemerataLink', function () {
		browser.assert.elements('.ROCOEphemerataLink', 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
