const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	_DataFoilListings: require('../task-a-listings/controller.js'),
	_DataFoilDetails: require('../task-b-details/controller.js'),
	_DataFoilImages: require('../task-c-images/controller.js'),

	DataProjectsSort (a, b) {
		const unmatched = [
			'EASProjectIconURL',
			'EASProjectBlurb',
			'EASProjectHasManifest',
		].filter(function (e) {
			return a[e] !== b[e];
		});

		if (unmatched.length) {
			return uDescending(unmatched.reduce(function (coll, item) {
				return coll + !!a[item];
			}, 0), unmatched.reduce(function (coll, item) {
				return coll + !!b[item];
			}, 0));
		}

		return 0;
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

		return Object.entries(_mod._DataFoilDetails._ValueCandidatesCache[inputData.EASProjectURL] || {}).reduce(function (coll, [key, value]) {
			if (key.startsWith('_') && coll[key.slice(1)]) {
				return coll;
			}

			if (key.startsWith('_')) {
				key = key.slice(1);
			}

			return Object.assign(coll, {
				[key]: value,
			});
		}, inputData);
	},

	DataProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilListings.DataListingProjects().map(function (e) {
			return _mod._DataProjectProperties(e);
		}).map(function (e) {
			return _mod._DataProjectImageProperty(e);
		}).sort(mod.DataProjectsSort);
	},

	DataProjectJSONSchema (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EASErrorInputNotValid');
		}

		return Object.entries({
			EASProjectName: 'name',
			EASProjectBlurb: 'description',
			EASProjectURL: 'url',
			EASProjectIconURL: 'image',
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
