const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import OLSKCache from 'OLSKCache';

describe('DataCachePathImages', function test_DataCachePathImages() {

	it('returns string', function () {
		deepEqual(mod.DataCachePathImages(), require('path').join(__dirname, '__cached', 'ui-assets'));
	});

	it('throws if not string', function () {
		throws(function () {
			mod.DataCachePathImages(null);
		}, /EASErrorInputNotValid/);
	});

	it('joins inputData', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataCachePathImages(item), require('path').join(__dirname, '__cached', 'ui-assets', item));
	});

});

describe('DataCacheImageLocalPath', function test_DataCacheImageLocalPath() {

	const _DataCacheImageLocalPath = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilFS: Object.assign({
				existsSync: (function () {}),
			}, inputData),
		}, inputData).DataCacheImageLocalPath(inputData.url || uLink());
	};

	it('calls existsSync', function () {
		const item = [];

		const url = uLink();

		_DataCacheImageLocalPath({
			url,
			existsSync: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(item, [mod.DataCachePathImages(OLSKCache.OLSKCacheURLFilename(url))]);
	});

	it('returns local URL if existsSync', function () {
		const url = uLink();

		deepEqual(_DataCacheImageLocalPath({
			url,
			existsSync: (function () {
				return true;
			}),
		}), mod.DataCachePathImages(OLSKCache.OLSKCacheURLFilename(url)).replace(require('path').join(__dirname, '../'), '/'));
	});

	it('returns null', function () {
		deepEqual(_DataCacheImageLocalPath({
			existsSync: (function () {
				return false;
			}),
		}), null);
	});

});

describe('SetupFetchQueue', function test_SetupFetchQueue() {

	const _SetupFetchQueue = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKQueue: inputData,
		}, inputData);
		return _mod.SetupFetchQueue() || _mod;
	};

	it('calls OLSKQueueAPI', function () {
		const item = Math.random().toString();
		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return [...arguments].concat(item);
			}),
		})._ValueFetchQueue, [item]);
	});

	it('sets _ValueFetchQueue', function () {
		const item = Math.random().toString();

		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return item;
			}),
		})._ValueFetchQueue, item);
	});

});

describe('_SetupImage', function test__SetupImage() {

	const __SetupImage = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueFetchQueue: Object.assign({}, inputData),
			_DataContentImage: (function () {}),
		}, inputData)._SetupImage(inputData.url);
	};

	it('calls OLSKQueueAdd', async function () {
		const url = uLink();

		deepEqual(await __SetupImage({
			url,
			OLSKQueueAdd: (function () {
				return [...arguments].map(function (e) {
					return typeof e;
				});
			}),
		}), ['function']);
	});

	it('calls _DataContentImage', async function () {
		const url = uLink();

		deepEqual(await __SetupImage({
			url,
			OLSKQueueAdd: (function (inputData) {
				return inputData();
			}),
			_DataContentImage: (function () {
				return [...arguments];
			}),
		}), [url, mod.DataCachePathImages(OLSKCache.OLSKCacheURLFilename(url))]);
	});

});

describe('SetupImages', function test_SetupImages() {

	const _SetupImages = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataProjects: (function () {
				return [];
			}),
			_SetupImage: (function () {}),
		}, inputData).SetupImages();
	};

	it('calls _SetupImage', async function () {
		const EASProjectIconURL = Math.random().toString();

		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{
					EASProjectIconURL,
				}];
			}),
			_SetupImage: (function () {
				return [...arguments];
			}),
		}), [[EASProjectIconURL]]);
	});

	it('ignores if no EASProjectIconURL', async function () {
		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{}];
			}),
		}), []);
	});

	it('ignores if already local', async function () {
		const EASProjectIconURL = Math.random().toString();
		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{
					EASProjectIconURL: Math.random().toString(),
					_EASProjectIconURLCachedPath: Math.random().toString(),
				}];
			}),
			_DataContentImage: (function () {
				return [...arguments];
			}),
		}), []);
	});

});
