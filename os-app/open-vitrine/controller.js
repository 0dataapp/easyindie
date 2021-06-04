const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'EASVitrineRoute',
			OLSKRouteFunction: (function EASVitrineRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'));
			}),
			OLSKRouteLanguageCodes: ['en'],
		}];
	},

};

Object.assign(exports, mod);
