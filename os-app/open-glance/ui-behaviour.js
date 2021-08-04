const mod = {

	// LIFECYCLE

	LifecyclePageWillLoad() {
		mod._ValueList = new List(document.querySelector('.EASGlance'), {
			searchClass: 'EASGlanceFilterInput',
			// sortClass: 'EASGlanceListSort',
			valueNames: [
				'EASGlanceListItemName',
				'EASGlanceListItemBlurb',
				{ data: ['tags', 'platforms'] },
			],
		});
	},

};
