const mod = {

	// MESSAGE

	WindowDispatchKeyup (event) {
		if (event.key !== 'Escape') {
			return;
		}

		mod._ValueList.search('');
		document.querySelector('.EASGlanceFilterInput').value = '';
	},

	// LIFECYCLE

	LifecyclePageWillLoad() {
		mod._ValueList = new List(document.querySelector('.EASGlance'), {
			searchClass: 'EASGlanceFilterInput',
			sortClass: 'EASGlanceListSort',
			valueNames: [
				'EASGlanceListItemName',
				'EASGlanceListItemBlurb',
			],
		});

		window.addEventListener('keyup', mod.WindowDispatchKeyup);
	},

};
