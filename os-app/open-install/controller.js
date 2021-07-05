const projects = require('../api-projects/controller.js');
const EASPlatform = require('../_shared/EASPlatform/main.js');

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/install/:EASProjectID',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'EASInstallRoute',
			OLSKRouteFunction: (function EASInstallRoute (req, res, next) {
				const EASInstallData = res.locals.OLSK_SPEC_UI() ? Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'EASInstallData') {
						e[1] = JSON.parse(e[1]);
					}

					return e;
				})).EASInstallData : projects.DataProjects().filter(function (e) {
					return e.EASProjectID === req.params.EASProjectID;
				}).shift();

				return !EASInstallData ? next() : res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
					EASInstallData,
					EASPlatform,
				});
			}),
			OLSKRouteLanguageCodes: ['en'],
		}];
	},

};

Object.assign(exports, mod);
