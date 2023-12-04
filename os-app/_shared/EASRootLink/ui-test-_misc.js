const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EASRootLink_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('OLSKRootLink', function () {
		
		it('sets OLSKRootLinkImageURL', function () {
			return browser.assert.attribute('.OLSKRootLinkImage', 'src', process.env.EAS_VITRINE_IDENTITY_URL);
		});
	
	});

});
