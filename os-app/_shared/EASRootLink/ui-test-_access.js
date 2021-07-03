const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EASRootLink: '.EASRootLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EASRootLink_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EASRootLink', function() {
		browser.assert.elements(EASRootLink, 1);
	});
	
	it('shows OLSKRootLink', function() {
		browser.assert.elements('.OLSKRootLink', 1);
	})
	
});
