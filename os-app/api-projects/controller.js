const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const uNeutralize = function (inputData = '') {
  return inputData.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/projects.json',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'EASProjectsJSONRoute',
			OLSKRouteFunction: (function EASProjectsJSONRoute (req, res, next) {
				return res.send(mod.DataProjectsJSON());
			}),
		}];
	},

	// DATA

	_DataFoilListings: require('../task-a-listings/controller.js'),
	_DataFoilDetails: require('../task-b-details/controller.js'),
	_DataFoilImages: require('../task-c-images/controller.js'),

	DataProjectsSort (a, b) {
		const unmatched = [
			'EASProjectIconURL',
			'EASProjectBlurb',
		].filter(function (e) {
			return (!!a[e]) !== (!!b[e]);
		});

		if (unmatched.length) {
			return uDescending(unmatched.reduce(function (coll, item) {
				return coll + !!a[item];
			}, 0), unmatched.reduce(function (coll, item) {
				return coll + !!b[item];
			}, 0));
		}

		const uCue = function (inputData, cue) {
			return Object.values(inputData.EASProjectPlatforms || {}).map(function (e) {
				return (e.EASPlatformCues || {})[cue];
			}).filter(function (e) {
				return !!e;
			}).shift();
		};
		const uCueCheck = function (param1, param2) {
			return typeof param2 === 'function' ? param2(param1) : (param1 === param2);
		};
		const cues = {} || {
			featured: true,
			high_quality: true,
			ranking: (function (e) {
				return e > 120;
			}),
		};
		const unmatchCues = Object.entries(cues).reduce(function (coll, [key, value]) {
			return coll.concat((uCueCheck(uCue(a, key), value)) !== (uCueCheck(uCue(b, key), value)) ? key : []);
		}, []);
		if (unmatchCues.length) {
			return uDescending(Object.entries(cues).reduce(function (coll, [key, value]) {
				return coll || (uCueCheck(uCue(a, key), value));
			}, false), Object.entries(cues).reduce(function (coll, [key, value]) {
				return coll || (uCueCheck(uCue(b, key), value));
			}, false));
		}

		const pattern = /git(?!hub.io)(?!ea)/i;
		const exclude = /(pages.github.com|about.gitlab.com)/i;
		return uAscending(a.EASProjectURL?.match(pattern) && !a.EASProjectURL?.match(exclude), b.EASProjectURL?.match(pattern) && !b.EASProjectURL?.match(exclude));
	},

	_DataProjectImageProperty (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		if (inputData.EASProjectIconURL) {
			inputData._EASProjectIconURLCachedPath = _mod._DataFoilImages.DataCacheLocalPath(inputData.EASProjectIconURL);
		}

		return inputData;
	},

	_DataProjectProperties (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return Object.entries(_mod._DataFoilDetails.ValueCandidatesCache()[inputData.EASProjectURL] || {}).reduce(function (coll, [key, value]) {
			if (key.startsWith('_') && coll[key.slice(1)]) {
				return coll;
			}

			if (key.startsWith('_')) {
				key = key.slice(1);
			}

			if (key === 'EASProjectFunding') {
				value = mod._TidyFunding(value);
			}

			return Object.assign(coll, {
				[key]: value,
			});
		}, inputData);
	},

	_TidyFunding (inputData) {
		const comparable = [];
		return !Array.isArray(inputData) ? inputData : inputData.filter(function (e) {
			const id = require('OLSKLink').OLSKLinkCompareURL(e);
			if (comparable.includes(id)) {
				return false;
			}

			comparable.push(id);

			return true;
		});
	},

	DataProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		// require('OLSKDisk').OLSKDiskWrite(require('OLSKDisk').OLSKDiskOpen(require('OLSKCache').OLSKCachePath(__dirname, '1-listings.json')), JSON.stringify(_mod._DataFoilListings.DataListingProjects(), null, ' '));
		// require('OLSKDisk').OLSKDiskWrite(require('OLSKDisk').OLSKDiskOpen(require('OLSKCache').OLSKCachePath(__dirname, '2-details.json')), JSON.stringify(_mod._DataFoilListings.DataListingProjects().map(function (e) { return _mod._DataProjectProperties(e) }), null, ' '));

		return _mod._DataFoilListings.DataListingProjects().map(function (e) {
			return _mod._DataProjectProperties(e);
		}).map(function (e) {
			return _mod._DataProjectImageProperty(e);
		}).sort(function (a, b) {
			return uAscending(uNeutralize(a.EASProjectName), uNeutralize(b.EASProjectName));
		}).sort(mod.DataProjectsSort);
	},

	DataProjectJSONSchema (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EASErrorInputNotValid');
		}

		return Object.entries({
			EASProjectID: 'id',
			EASProjectName: 'name',
			EASProjectBlurb: 'description',
			EASProjectURL: 'url',
			EASProjectIconURL: 'image',
			EASProjectTags: 'keywords',
			EASProjectFunding: 'funding',
		}).reduce(function (coll, item) {
			return !inputData[item[0]] ? coll : Object.assign(coll, {
				[item[1]]: inputData[item[0]],
			});
		}, {});
	},

	DataProjectsJSON () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return JSON.stringify(_mod.DataProjects().map(mod.DataProjectJSONSchema));
	},

};

Object.assign(exports, mod);
