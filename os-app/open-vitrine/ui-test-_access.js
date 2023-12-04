const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EASVitrine: '.EASVitrine',
	
	EASVitrinePlatformsHeading: '.EASVitrinePlatformsHeading',
	EASVitrinePlatformsBlurb: '.EASVitrinePlatformsBlurb',
	EASVitrinePlatformsLink: '.EASVitrinePlatformsLink',
	EASVitrinePlatformsLinkImage: '.EASVitrinePlatformsLinkImage',
	EASVitrinePlatformsLinkText: '.EASVitrinePlatformsLinkText',

	EASVitrineDiscussingHeading: '.EASVitrineDiscussingHeading',
	EASVitrineDiscussingVideo: '.EASVitrineDiscussingVideo',

	EASVitrineAlternativesHeading: '.EASVitrineAlternativesHeading',
	EASVitrineAlternativesContainer: '.EASVitrineAlternativesContainer',
	EASVitrineAlternativesLink: '.EASVitrineAlternativesLink',
	EASVitrineAlternativesBlurb: '.EASVitrineAlternativesBlurb',

	EASVitrineAlsoHeading: '.EASVitrineAlsoHeading',
	EASVitrineZeroDataCrown: '.EASVitrineZeroDataCrown',
	EASVitrineZeroDataCrownIcon: '.EASVitrineZeroDataCrownIcon',
	EASVitrineZeroDataCrownName: '.EASVitrineZeroDataCrownName',
	EASVitrineZeroDataCrownBlurb: '.EASVitrineZeroDataCrownBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EASVitrine_Access', function () {

	const platforms = require('../task-a-banks/controller.js').DataBankPlatforms().length;
	const alternatives = require('../task-a-banks/controller.js').DataBankAlternatives().length;

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EASVitrine', function() {
		return browser.assert.elements(EASVitrine, 1);
	});
	
	it('shows OLSKCrown', function() {
		return browser.assert.elements('.OLSKCrown', 1);
	});
	
	it('shows OLSKLanding', function() {
		return browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows EASVitrinePlatformsHeading', function () {
		return browser.assert.elements(EASVitrinePlatformsHeading, 1);
	});

	it('shows EASVitrinePlatformsBlurb', function () {
		return browser.assert.elements(EASVitrinePlatformsBlurb, 1);
	});

	it.skip('shows EASVitrinePlatformsLink', function () {
		return browser.assert.elements(EASVitrinePlatformsLink, platforms);
	});

	it.skip('shows EASVitrinePlatformsLinkImage', function () {
		return browser.assert.elements(EASVitrinePlatformsLinkImage, platforms);
	});

	it.skip('shows EASVitrinePlatformsLinkText', function () {
		return browser.assert.elements(EASVitrinePlatformsLinkText, platforms);
	});

	it('shows EASVitrineDiscussingHeading', function () {
		return browser.assert.elements(EASVitrineDiscussingHeading, 1);
	});

	it('shows EASVitrineDiscussingVideo', function () {
		return browser.assert.elements(EASVitrineDiscussingVideo, 1);
	});

	it('shows EASVitrineAlternativesHeading', function () {
		return browser.assert.elements(EASVitrineAlternativesHeading, 1);
	});

	it('shows EASVitrineAlternativesContainer', function () {
		return browser.assert.elements(EASVitrineAlternativesContainer, 1);
	});

	it.skip('shows EASVitrineAlternativesLink', function () {
		return browser.assert.elements(EASVitrineAlternativesLink, alternatives);
	});

	it.skip('shows EASVitrineAlternativesBlurb', function () {
		return browser.assert.elements(EASVitrineAlternativesBlurb, alternatives);
	});

	it('shows ROCOGazette', function () {
		return browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		return browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows EASVitrineAlsoHeading', function () {
		return browser.assert.elements(EASVitrineAlsoHeading, 1);
	});

	it('shows EASVitrineZeroDataCrown', function () {
		return browser.assert.elements(EASVitrineZeroDataCrown, 1);
	});

	it('shows EASVitrineZeroDataCrownIcon', function () {
		return browser.assert.elements(EASVitrineZeroDataCrownIcon, 1);
	});

	it('shows EASVitrineZeroDataCrownName', function () {
		return browser.assert.elements(EASVitrineZeroDataCrownName, 1);
	});

	it('shows EASVitrineZeroDataCrownBlurb', function () {
		return browser.assert.elements(EASVitrineZeroDataCrownBlurb, 1);
	});

	it('shows SWARLink', function() {
		return browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		return browser.assert.elements('.ROCORootLink', 1);
	});

});
