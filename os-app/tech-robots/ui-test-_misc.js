const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EASRobots_Misc', function () {

	it.skip('sends text', async function () {
		return browser.assert.deepEqual(await (await browser.fetch('http://localhost' + kDefaultRoute.OLSKRoutePath)).text(), 'User-agent: *\nAllow: /\n');
	});

});
