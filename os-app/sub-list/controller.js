const EASPlatform = require('../_shared/EASPlatform/main.js');

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/stub/EASGlanceList',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: (function EASGlanceListStubRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), Object.assign({
					EASGlanceListData: [],
					EASPlatform,
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'EASGlanceListData') {
						e[1] = JSON.parse(e[1]);
					}

					return e;
				}))));
			}),
			OLSKRouteSignature: 'EASGlanceListStubRoute',
			OLSKRouteLanguageCodes: ['en'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
	},

};

Object.assign(exports, mod);
