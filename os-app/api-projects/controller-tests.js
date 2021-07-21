const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import { JSDOM } from 'jsdom';
import OLSKLink from 'OLSKLink';
import OLSKCache from 'OLSKCache';

describe('DataProjectsSort', function test_DataProjectsSort() {

	context('EASProjectURL', function () {
		
		it('bumps if not git', function () {
			const item1 = {
				EASProjectURL: 'git' + Math.random().toString(),
			};
			const item2 = {
				EASProjectURL: Math.random().toString(),
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});

		it('bumps github.io', function () {
			const item1 = {
				EASProjectURL: 'git' + Math.random().toString(),
			};
			const item2 = {
				EASProjectURL: 'github.io' + Math.random().toString(),
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});

		it('bumps gitea', function () {
			const item1 = {
				EASProjectURL: 'git' + Math.random().toString(),
			};
			const item2 = {
				EASProjectURL: 'gitea' + Math.random().toString(),
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});

		it('bumps pages.github.com', function () {
			const item1 = {
				EASProjectURL: 'git' + Math.random().toString(),
			};
			const item2 = {
				EASProjectURL: 'pages.github.com' + Math.random().toString(),
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});

		it('bumps about.gitlab.com', function () {
			const item1 = {
				EASProjectURL: 'git' + Math.random().toString(),
			};
			const item2 = {
				EASProjectURL: 'about.gitlab.com' + Math.random().toString(),
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});
	
	});

	it('bumps EASProjectIconURL', function () {
		const item1 = {};
		const item2 = {
			EASProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	it('bumps EASProjectIconURL + EASProjectBlurb', function () {
		const item1 = {
			EASProjectIconURL: Math.random().toString(),
		};
		const item2 = {
			EASProjectBlurb: Math.random().toString(),
			EASProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	context.skip('EASPlatformCues', function () {
		
		it('bumps featured', function () {
			const item1 = {};
			const item2 = {
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformCues: {
							featured: true,
						},
					},
				},
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});

		it('bumps high_quality', function () {
			const item1 = {};
			const item2 = {
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformCues: {
							high_quality: true,
						},
					},
				},
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});

		it('bumps ranking', function () {
			const item1 = {
				[Math.random().toString()]: {
					EASPlatformCues: {
						ranking: 120,
					},
				},
			};
			const item2 = {
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformCues: {
							ranking: 121,
						},
					},
				},
			};

			deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
		});
	
	});

});

describe('_DataProjectImageProperty', function test__DataProjectImageProperty() {
	
	const __DataProjectImageProperty = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
		}, inputData)._DataProjectImageProperty(inputData.ParamProject);
	};

	it('returns inputData', function () {
		const ParamProject = {
			EASProjectIconURL: uLink(),
		};
		deepEqual(__DataProjectImageProperty({
			ParamProject,
		}), ParamProject);
	});

	it('sets _EASProjectIconURLCachedPath if _DataFoilImages.DataCacheLocalPath', function () {
		const EASProjectIconURL = Math.random().toString();
		const DataCacheLocalPath = Math.random().toString();

		deepEqual(__DataProjectImageProperty({
			ParamProject: {
				EASProjectIconURL,
			},
			_DataFoilImages: {
				DataCacheLocalPath: (function () {
					return DataCacheLocalPath;
				}),
			},
		}), {
			EASProjectIconURL,
			_EASProjectIconURLCachedPath: DataCacheLocalPath,
		});
	});

});

describe('_DataProjectProperties', function test__DataProjectProperties() {
	
	const __DataProjectProperties = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilDetails: {
				ValueCandidatesCache: function () {
					return inputData._ValueCandidatesCache || {};
				},
			},
			_DataDetailsDOMPropertyCandidates: (function () {
				return [];
			}),
		}, inputData)._DataProjectProperties(inputData.ParamProject);
	};

	it('throws if not object', function () {
		throws(function () {
			mod._DataProjectProperties(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('returns inputData', function () {
		const ParamProject = {
			EASProjectURL: Math.random().toString(),
		};
		deepEqual(__DataProjectProperties({
			ParamProject,
		}), ParamProject);
	});
	
	it('includes _ValueCandidatesCache', function () {
		const EASProjectURL = Math.random().toString();
		const ParamProject = {
			EASProjectURL,
		};
		const _ValueCandidatesCache = {
			[EASProjectURL]: {
				[Math.random().toString()]: Math.random().toString(),
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), Object.assign(ParamProject, _ValueCandidatesCache));
	});
	
	it('excludes underscore if present', function () {
		const EASProjectURL = Math.random().toString();
		const item = Math.random().toString();
		const ParamProject = {
			EASProjectURL,
			[item]: Math.random().toString(),
		};
		const _ValueCandidatesCache = {
			[EASProjectURL]: {
				['_' + item]: Math.random().toString(),
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), ParamProject);
	});
	
	it('strips underscore', function () {
		const EASProjectURL = Math.random().toString();
		const item = Math.random().toString();
		const ParamProject = {
			EASProjectURL,
		};
		const _ValueCandidatesCache = {
			[EASProjectURL]: {
				['_' + item]: item,
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), Object.assign(ParamProject, {
			[item]: item,
		}));
	});

});

describe('_TidyFunding', function test__TidyFunding() {

	it('returns inputData', function () {
		const item = Math.random().toString();
		deepEqual(mod._TidyFunding(item), item);
	});

	it('excludes if exact duplicate', function () {
		const item = Math.random().toString();
		deepEqual(mod._TidyFunding([item, item]), [item]);
	});

	it('excludes if relative duplicate', function () {
		const item = uLink();
		deepEqual(mod._TidyFunding([item, item.replace('https', 'http')]), [item]);
	});

});

describe('DataProjects', function test_DataProjects() {
	
	const _DataProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilDetails: Object.assign({
				ValueCandidatesCache: function () {
					return inputData._ValueCandidatesCache || {};
				},
			}, inputData),
			_DataFoilBanks: Object.assign({
				DataBankProjects: (function () {}),
			}, inputData),
		}, inputData).DataProjects();
	};

	it('merges sources', function () {
		const candidates = {
			[Math.random().toString()]: Math.random().toString(),
		};
		const EASProjectURL = Math.random().toString();
		const _EASProjectIconURLCachedPath = Math.random().toString();
		deepEqual(_DataProjects({
			_ValueCandidatesCache: {
				[EASProjectURL]: candidates,
			},
			DataBankProjects: (function () {
				return [{
					EASProjectURL,
				}];
			}),
			_DataProjectImageProperty: (function (inputData) {
				return Object.assign(inputData, {
					_EASProjectIconURLCachedPath,
				});
			}),
		}), [Object.assign({
			EASProjectURL,
		}, candidates, {
			_EASProjectIconURLCachedPath,
		})]);
	});

	it('sorts with DataProjectsSort', function () {
		const item1 = {
			EASProjectURL: Math.random().toString(),
		};
		const item2 = {
			EASProjectURL: Math.random().toString(),
			EASProjectIconURL: uLink(),
		};

		deepEqual(_DataProjects({
			DataBankProjects: (function () {
				return [item1, item2];
			}),
		}), [item2, item1]);
	});

});

describe('DataProjectJSONSchema', function test_DataProjectJSONSchema() {
	
	it('throws if not object', function () {
		throws(function () {
			mod.DataProjectJSONSchema(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mod.DataProjectJSONSchema({}), {});
	});

	it('maps EASProjectID', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectID: item,
		}), {
			id: item,
		});
	});

	it('maps EASProjectName', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectName: item,
		}), {
			name: item,
		});
	});

	it('maps EASProjectBlurb', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectBlurb: item,
		}), {
			description: item,
		});
	});

	it('maps EASProjectURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectURL: item,
		}), {
			url: item,
		});
	});

	it('maps EASProjectIconURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectIconURL: item,
		}), {
			image: item,
		});
	});

	it('maps EASProjectTags', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectTags: item,
		}), {
			keywords: item,
		});
	});

	it('maps EASProjectFunding', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			EASProjectFunding: item,
		}), {
			funding: item,
		});
	});

});

describe('DataProjectsJSON', function test_DataProjectsJSON() {

	it('returns string', function () {
		const EASProjectName = Math.random().toString();
		const item = {
			EASProjectName,
		};

		deepEqual(Object.assign(Object.assign({}, mod), {
			DataProjects: (function () {
				return [item];
			}),
		}).DataProjectsJSON(), JSON.stringify([mod.DataProjectJSONSchema(item)]));
	});

});
