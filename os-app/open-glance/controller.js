const projects = require('../api-projects/controller.js');

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/glance',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'EASGlanceRoute',
			OLSKRouteFunction: (function EASGlanceRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), res.locals.OLSK_SPEC_UI() ? Object.assign({
					EASGlanceListData: [{
						EASProjectID: Math.random().toString(),
					}],
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'EASGlanceListData') {
						e[1] = JSON.parse(e[1]);
					}

					return e;
				}))) : {
					EASGlanceListData: projects.DataProjects(),
				});
			}),
			OLSKRouteLanguageCodes: ['en'],
		}];
	},

};

Object.assign(exports, mod);
