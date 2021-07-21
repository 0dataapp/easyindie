const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

const EASPlatform = require('../_shared/EASPlatform/main.js');
import OLSKCache from 'OLSKCache';

describe('_DataBankObjects', function test__DataBankObjects() {

	it('throws if param1 not in DataBankURLs', function () {
		throws(function () {
			mod._DataBankObjects(Math.random().toString(), Math.random().toString());
		}, /EASErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataBankObjects(uRandomElement(EASPlatform.EASPlatformURLs()), null);
		}, /EASErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataBankObjects(uRandomElement(EASPlatform.EASPlatformURLs()), ''), []);
	});

	context('Cloudron', function test_Cloudron () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				EASProjectURL: Math.random().toString(),
				EASPlatformName: Math.random().toString(),
				EASPlatformBlurb: Math.random().toString(),
				EASPlatformImageURL: Math.random().toString(),
				EASPlatformTagSources: Array.from(Array(uRandomInt(5))).map(function () {
					return Math.random().toString();
				}),
				EASPlatformDocsPath: Math.random().toString(),
				EASPlatformCues: {
					id: Math.random().toString(),
					creationDate: Math.random().toString(),
					publishState: Math.random().toString(),
					visibility: Math.random().toString(),
					releaseState: Math.random().toString(),
					featured: Math.random(),
					ranking: Math.random(),
					installCount: Math.random(),
				},
			}, inputData);

			return `$scope.allApps = [{"id":"${ item.EASPlatformCues.id }","creationDate":"${ item.EASPlatformCues.creationDate }","publishState":"${ item.EASPlatformCues.publishState }","ownerId":"bfa555ee-8db7-4027-94f6-7409feafd4cb","userId":"bfa555ee-8db7-4027-94f6-7409feafd4cb","visibility":"${ item.EASPlatformCues.visibility }","releaseState":"${ item.EASPlatformCues.releaseState }","ts":"2021-02-22T23:02:27.000Z","manifest":{"id":"com.electerious.ackee","version":"1.0.0","title":"${ item.EASPlatformName }","author":"Ackee Community","description":"This app packages Ackee <upstream>3.0.5</upstream>\\n\\nAckee is a self-hosted analytics tool that cares about privacy. We believe that you don't need to track every aspect of your visitors. Ackee keeps tracked data anonymized to avoid that users are identifiable, while still providing helpful insights. It's the right tool for everyone who doesn't need a full-featured marketing analytics platform like Google Analytics or Matomo.\\n\\n## Features\\n\\n* Self-hosted: Ackee runs on your own server and is 100% open-source\\n* Modern technologies: Lightweight Node.js and MongoDB architecture\\n* Beautiful: Minimal and focused interface\\n* No cookies: No unique user tracking and therefore no required cookie message\\n* Events: Track button clicks, newsletter subscriptions and more\\n* GraphQL API: Fully documented GraphQL API that allows you to build new tools upon Ackee\\n\\n","tagline":"${ item.EASPlatformBlurb }","website":"${ item.EASProjectURL }","icon":"file://logo.png","mediaLinks":["https://screenshots.cloudron.io/com.electerious.ackee/1.png"],"healthCheckPath":"/","httpPort":3000,"addons":{"localstorage":{},"mongodb":{}},"contactEmail":"support@cloudron.io","tags":${ JSON.stringify(item.EASPlatformTagSources) },"changelog":"* Initial stable version\\n* Update Ackee to 3.0.5\\n* [Full changelog](https://github.com/electerious/Ackee/releases/tag/v3.0.5)\\n","postInstallMessage":"This app is pre-setup with an admin account.\\n\\n**Username**: admin<br/>\\n**Password**: changeme<br/>\\n\\nPlease change the admin email and password credentials immediately by editing \`/app/data/env\`\\nand restarting the app.\\n\\n","documentationUrl":"${ item.EASPlatformDocsPath }","forumUrl":"https://forum.cloudron.io/category/125/ackee","minBoxVersion":"5.3.0","manifestVersion":2,"dockerImage":"cloudron/com.electerious.ackee:20210222-173644-5145b0590","memoryLimit":256,"richDescription":"<p>This app packages Ackee <upstream>3.0.5</upstream></p>\\n<p>Ackee is a self-hosted analytics tool that cares about privacy. We believe that you don&#39;t need to track every aspect of your visitors. Ackee keeps tracked data anonymized to avoid that users are identifiable, while still providing helpful insights. It&#39;s the right tool for everyone who doesn&#39;t need a full-featured marketing analytics platform like Google Analytics or Matomo.</p>\\n<h2 id=\\"features\\">Features</h2>\\n<ul>\\n<li>Self-hosted: Ackee runs on your own server and is 100% open-source</li>\\n<li>Modern technologies: Lightweight Node.js and MongoDB architecture</li>\\n<li>Beautiful: Minimal and focused interface</li>\\n<li>No cookies: No unique user tracking and therefore no required cookie message</li>\\n<li>Events: Track button clicks, newsletter subscriptions and more</li>\\n<li>GraphQL API: Fully documented GraphQL API that allows you to build new tools upon Ackee</li>\\n</ul>\\n"},"featured":${ item.EASPlatformCues.featured },"iconUrl":"${ item.EASPlatformImageURL }","ranking":${ item.EASPlatformCues.ranking },"installCount":${ item.EASPlatformCues.installCount },"creationDateSortable":"20210222230200","creationDatePretty":"22 Feb 2021","version":"3.0.5","changes":["<p>Initial stable version</p>\\n","<p>Update Ackee to 3.0.5</p>\\n","<p><a href=\\"https://github.com/electerious/Ackee/releases/tag/v3.0.5\\">Full changelog</a></p>\\n"]}];
    $scope.apps = null;`;
		};
		
		it('parses data', function () {
			const EASProjectURL = Math.random().toString();
			const EASPlatformName = Math.random().toString();
			const EASPlatformBlurb = Math.random().toString();
			const EASPlatformImageURL = Math.random().toString();
			const EASPlatformTagSources = Array.from(Array(uRandomInt(5))).map(function () {
				return Math.random().toString();
			});
			const EASPlatformDocsPath = Math.random().toString();
			const EASPlatformCues = {
				id: Math.random().toString(),
				creationDate: Math.random().toString(),
				publishState: Math.random().toString(),
				visibility: Math.random().toString(),
				releaseState: Math.random().toString(),
				featured: Math.random(),
				ranking: Math.random(),
				installCount: Math.random(),
			};

			deepEqual(mod._DataBankObjects(EASPlatform.EASPlatformURLCloudron(), uBank({
				EASProjectURL,
				EASPlatformName,
				EASPlatformBlurb,
				EASPlatformImageURL,
				EASPlatformTagSources,
				EASPlatformDocsPath,
				EASPlatformCues,
			})), [{
				EASProjectURL,
				EASProjectPlatforms: {
					EASPlatformCloudron: {
						EASPlatformName,
						EASPlatformBlurb,
						EASPlatformImageURL,
						EASPlatformTagSources,
						EASPlatformDocsPath,
						EASPlatformCues,
						EASPlatformSystem: EASPlatform.EASPlatformSystemProperties().EASPlatformCloudron,
					},
				},
			}]);
		});
	
	});
	
	context('Caprover', function test_Caprover () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				EASPlatformName: Math.random().toString(),
				EASPlatformBlurb: Math.random().toString(),
				EASPlatformImageURL: Math.random().toString(),
				EASPlatformCues: {
					name: Math.random().toString(),
					isOfficial: Math.random().toString(),
				},
			}, inputData);

			return `{"oneClickApps":[{"baseUrl":"https://oneclickapps.caprover.com","name":"${ item.EASPlatformCues.name }","displayName":"${ item.EASPlatformName }","isOfficial":${ item.EASPlatformCues.isOfficial },"description":"${ item.EASPlatformBlurb }","logoUrl":"${ item.EASPlatformImageURL }"}]}`;
		};
		
		it('parses data', function () {
			const EASPlatformName = Math.random().toString();
			const EASPlatformBlurb = Math.random().toString();
			const EASPlatformImageURL = Math.random().toString();
			const EASPlatformCues = {
				name: Math.random().toString(),
				isOfficial: Math.random().toString(),
			};

			deepEqual(mod._DataBankObjects(EASPlatform.EASPlatformURLCaprover(), uBank({
				EASPlatformName,
				EASPlatformBlurb,
				EASPlatformImageURL,
				EASPlatformCues,
			})), [{
				EASProjectPlatforms: {
					EASPlatformCaprover: {
						EASPlatformName,
						EASPlatformBlurb,
						EASPlatformImageURL: 'https://oneclickapps.caprover.com/v4/logos/' + EASPlatformImageURL,
						EASPlatformCues,
						EASPlatformSystem: EASPlatform.EASPlatformSystemProperties().EASPlatformCaprover,
					},
				},
			}]);
		});
	
	});

	context('Yunohost', function test_Yunohost () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				EASProjectURL: Math.random().toString(),
				EASPlatformName: Math.random().toString(),
				EASPlatformBlurb: Math.random().toString(),
				EASPlatformCategory: Math.random().toString(),
				EASPlatformTagSources: [Math.random().toString(), Math.random().toString()],
				EASPlatformCues: {
					featured: Math.random().toString(),
					high_quality: Math.random().toString(),
					id: Math.random().toString(),
					lastUpdate: Math.random().toString(),
					level: Math.random().toString(),
					maintained: Math.random().toString(),
					multi_instance: Math.random().toString(),
					state: Math.random().toString(),
				},
			}, inputData);

			return `{"apps": {"20euros": {"category": "synchronization", "featured": ${ item.EASPlatformCues.featured }, "git": {"branch": "master", "revision": "ed560b9fdcd2f0096bdc709913ddba79059f60f0", "url": "https://github.com/YunoHost-Apps/20euros_ynh"}, "high_quality": ${ item.EASPlatformCues.high_quality }, "id": "${ item.EASPlatformCues.id }", "lastUpdate": ${ item.EASPlatformCues.lastUpdate }, "level": ${ item.EASPlatformCues.level }, "maintained": ${ item.EASPlatformCues.maintained }, "manifest": {"arguments": {"install": [{"example": "domain.org", "name": "domain", "type": "domain"}, {"default": "/20euros", "example": "/20euros", "name": "path", "type": "path"}, {"default": true, "help": {"en": "If enabled, 20 euros will be accessible by people who doesn\u2019t have an account. This can be changed later via the webadmin.", "fr": "Si cette case est coch\u00e9e, 20 euros sera accessible aux personnes n\u2019ayant pas de compte. Vous pourrez changer ceci plus tard via la webadmin."}, "name": "is_public", "type": "boolean"}]}, "description": {"ar": "2048 - 20euros", "en": "${ item.EASPlatformBlurb }", "es": "2048 - 20euros", "fr": "2048 - 20euros", "nl": "2048 - 20euros", "oc": "2048 - 20euros"}, "id": "20euros", "license": "MIT", "maintainer": {"email": "", "name": "eric_G"}, "multi_instance": ${ item.EASPlatformCues.multi_instance }, "name": "${ item.EASPlatformName }", "packaging_format": 1, "requirements": {"yunohost": ">= 4.1.7"}, "services": ["nginx"], "url": "${ item.EASProjectURL }", "version": "1.0~ynh4"}, "state": "${ item.EASPlatformCues.state }", "subtags": ["files"]}}, "categories": [{"description": {"en": "${ item.EASPlatformTagSources[0] }", "es": "Sincronizaci\u00f3n, contactos, calendario, gestor de contrase\u00f1as...", "fr": "Fichiers, contacts, calendrier, mots de passe..."}, "icon": "cloud", "id": "synchronization", "subtags": [{"id": "files", "title": {"en": "${ item.EASPlatformTagSources[1] }", "es": "Archivos", "fr": "Fichiers"}}], "title": {"en": "${ item.EASPlatformCategory }", "es": "Sincronizaci\u00f3n", "fr": "Synchronisation"}}, {"description": {"en": "Websites, blog, wiki, CMS...", "es": "Paginas Web, blog, wiki, CMS...", "fr": "Site web, blog, wiki, CMS..."}, "icon": "globe", "id": "publishing", "subtags": [{"id": "websites", "title": {"en": "Websites", "es": "Paginas web", "fr": "Sites web"}}, {"id": "blog", "title": {"en": "Blog", "es": "blog", "fr": "Blog"}}, {"id": "wiki", "title": {"en": "Wiki", "es": "Wiki", "fr": "Wiki"}}, {"id": "ecommerce", "title": {"en": "E-commerce", "es": "Comercio eletronico", "fr": "Vente en ligne"}}, {"id": "analytics", "title": {"en": "Analytics", "es": "Estadisticas", "fr": "Statistiques"}}], "title": {"en": "Publishing", "es": "Publicaciones", "fr": "Publication"}}, {"description": {"en": "Chat, email, forum, meetings...", "es": "Chat, email, foro, reuniones en grupo...", "fr": "Chat, email, forum, meetings..."}, "icon": "comments-o", "id": "communication", "subtags": [{"id": "chat", "title": {"en": "Instant messaging", "es": "Mensajeria Instantanea", "fr": "Messagerie instantann\u00e9e"}}, {"id": "forum", "title": {"en": "Forum", "es": "Foro", "fr": "Forum"}}, {"id": "email", "title": {"en": "Email", "es": "Email", "fr": "Email"}}, {"id": "meeting", "title": {"en": "Meetings", "es": "Reuniones", "fr": "Meetings"}}], "title": {"en": "Communication", "es": "Comunicacion", "fr": "Communication"}}, {"description": {"en": "Collaborative text edition, spreadsheets...", "es": "Edici\u00f3n de texto colaborativo, hojas de c\u00e1lculo...", "fr": "\u00c9dition de texte collaborative, tableurs..."}, "icon": "file-text-o", "id": "office", "subtags": [{"id": "text", "title": {"en": "Text", "es": "Texto", "fr": "Texte"}}, {"id": "spreadsheet", "title": {"en": "Speadsheet", "es": "Hoja de c\u00e1lculo", "fr": "Tableur"}}, {"id": "impress", "title": {"en": "Slide show", "es": "Diapositivas", "fr": "Diaporama"}}, {"id": "draw", "title": {"en": "Graphism", "es": "Graficos", "fr": "Graphisme"}}, {"id": "mindmap", "title": {"en": "Mindmap", "fr": "Cartes mentale"}}], "title": {"en": "Office", "es": "Ofimatica", "fr": "Bureautique"}}, {"description": {"en": "Tasks, polls, accounting, ERP...", "fr": "T\u00e2ches, sondages, comptabilit\u00e9, ERP..."}, "icon": "area-chart", "id": "productivity_and_management", "subtags": [{"id": "task", "title": {"en": "Task", "fr": "T\u00e2ches"}}, {"id": "poll", "title": {"en": "Poll", "fr": "Sondage"}}, {"id": "accounting", "title": {"en": "Accounting", "fr": "Comptabilit\u00e9"}}, {"id": "business_and_ngos", "title": {"en": "Business and NGOs", "fr": "Entreprises et associations"}}], "title": {"en": "Productivity & management", "fr": "Productivit\u00e9 & gestion"}}, {"description": {"en": "Pastebins, URL shortener, proxies...", "fr": "Pastebins, raccourcisseurs d'URL, proxys..."}, "icon": "umbrella", "id": "small_utilities", "subtags": [{"id": "pastebin", "title": {"en": "Pastebin", "fr": "Pastebin"}}, {"id": "url_shortener", "title": {"en": "URL shortener", "fr": "Raccourcisseurs d'URL"}}], "title": {"en": "Small utilities", "fr": "Petits utilitaires"}}, {"description": {"en": "Newsfeed readers, books library...", "fr": "Fils d'actualit\u00e9, livres..."}, "icon": "newspaper-o", "id": "reading", "subtags": [{"id": "rssreader", "title": {"en": "RSS readers", "fr": "Lecteurs RSS"}}, {"id": "books", "title": {"en": "Books", "fr": "Livres"}}], "title": {"en": "Reading", "fr": "Lecture"}}, {"description": {"en": "Music library, pictures gallery, P2P, TV shows...", "fr": "Biblioth\u00e8que de musique, d'images, P2P, s\u00e9ries..."}, "icon": "music", "id": "multimedia", "subtags": [{"id": "mediacenter", "title": {"en": "Media center", "fr": "Centre multim\u00e9dia"}}, {"id": "download", "title": {"en": "Download", "fr": "T\u00e9l\u00e9chargement"}}, {"id": "music", "title": {"en": "Music", "fr": "Musique"}}, {"id": "pictures", "title": {"en": "Pictures", "fr": "Images"}}], "title": {"en": "Multimedia", "fr": "Multim\u00e9dia"}}, {"description": {"en": "Microblogging, federated media", "fr": "Microblogging, m\u00e9dias f\u00e9d\u00e9r\u00e9s"}, "icon": "users", "id": "social_media", "subtags": [{"id": "microblogging", "title": {"en": "Microblogging", "fr": "Microblogging"}}, {"id": "blogging", "title": {"en": "Blogging", "fr": "Blogging"}}, {"id": "events", "title": {"en": "Events", "fr": "\u00c9v\u00e9nements"}}, {"id": "videos", "title": {"en": "Videos", "fr": "Vid\u00e9os"}}, {"id": "pictures", "title": {"en": "Pictures", "fr": "Images"}}, {"id": "music", "title": {"en": "Music", "fr": "Musique"}}], "title": {"en": "Social media", "fr": "M\u00e9dias sociaux"}}, {"description": {"en": "Wanna have some fun? :)", "fr": "Envie de s'amuser ? ;)"}, "icon": "gamepad", "id": "games", "title": {"en": "Games", "fr": "Jeux"}}, {"description": {"en": "Git forges, apps skeleton, CI, translation...", "fr": "Forges Git, squelette d'apps, CI, traduction..."}, "icon": "flask", "id": "dev", "subtags": [{"id": "forge", "title": {"en": "Forge", "fr": "Forge"}}, {"id": "skeleton", "title": {"en": "Skeleton", "fr": "Squelettes"}}, {"id": "programming", "title": {"en": "Programming", "fr": "Programmation"}}], "title": {"en": "Development", "fr": "D\u00e9veloppement"}}, {"description": {"en": "Monitoring, backup, network, DB tools...", "fr": "Monitoring, sauvegardes, outils r\u00e9seau, bases de donn\u00e9es..."}, "icon": "wrench", "id": "system_tools", "subtags": [{"id": "backup", "title": {"en": "Backup", "fr": "Sauvegardes"}}, {"id": "monitoring", "title": {"en": "Monitoring", "fr": "Monitoring"}}, {"id": "network", "title": {"en": "Network", "fr": "R\u00e9seau"}}, {"id": "db", "title": {"en": "Databases", "fr": "Bases de donn\u00e9es"}}], "title": {"en": "System tools", "fr": "Outils syst\u00e8me"}}, {"description": {"en": "Home automation, energy dashboard...", "fr": "Domotique, \u00e9nergie..."}, "icon": "home", "id": "iot", "title": {"en": "Internet of Things (IoT)", "fr": "Internet des objets (IoT)"}}, {"description": {"en": "Weird experimental or very-custom stuff", "fr": "Trucs exp\u00e9rimentaux et autres projets sp\u00e9cifiques"}, "icon": "tree", "id": "wat", "title": {"en": "Wat", "fr": "Wat"}}]}`;
		};
		
		it('parses data', function () {
			const EASProjectURL = Math.random().toString();
			const EASPlatformName = Math.random().toString();
			const EASPlatformBlurb = Math.random().toString();
			const EASPlatformCategory = Math.random().toString();
			const EASPlatformTagSources = [Math.random().toString(), Math.random().toString()];
			const EASPlatformCues = {
				featured: Math.random().toString(),
				high_quality: Math.random().toString(),
				id: Math.random().toString(),
				lastUpdate: Math.random().toString(),
				level: Math.random().toString(),
				maintained: Math.random().toString(),
				multi_instance: Math.random().toString(),
				state: Math.random().toString(),
			};

			deepEqual(mod._DataBankObjects(EASPlatform.EASPlatformURLYunohost(), uBank({
				EASProjectURL,
				EASPlatformName,
				EASPlatformBlurb,
				EASPlatformCategory,
				EASPlatformTagSources,
				EASPlatformCues,
			})), [{
				EASProjectURL,
				EASProjectPlatforms: {
					EASPlatformYunohost: {
						EASPlatformName,
						EASPlatformBlurb,
						EASPlatformCategory,
						EASPlatformTagSources,
						EASPlatformCues,
						EASPlatformSystem: EASPlatform.EASPlatformSystemProperties().EASPlatformYunohost,
					},
				},
			}]);
		});
	
	});

});

describe('_DataFilterProject', function test__DataFilterProject() {

	it('returns true', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod._DataFilterProject(item), true);
	});

	context('EASPlatformName', function () {
		
		[
			'WordPress (Developer)',
			'Anarchism',
			'Fallback server',
			'Phpinfo',
			'WemaWema',
			'ssh chroot directory',
			'Riot',
			'LibreQR',
		].forEach(function (EASPlatformName) {
			
			it(`filters ${ EASPlatformName }`, function () {
				deepEqual(mod._DataFilterProject({
					EASProjectPlatforms: {
						[Math.random().toString()]: {
							EASPlatformName,
						},
					},
				}), false);
			});

		});
	
	});

	context('EASPlatformCategory', function () {
		
		[
			'Games',
		].forEach(function (EASPlatformCategory) {
			
			it(`filters ${ EASPlatformCategory }`, function () {
				deepEqual(mod._DataFilterProject({
					EASProjectPlatforms: {
						[Math.random().toString()]: {
							EASPlatformCategory,
						},
					},
				}), false);
			});

		});
	
	});

	context('EASPlatformTagSources', function () {
		
		[
			'game',
		].forEach(function (e) {
			
			it(`filters ${ e }`, function () {
				deepEqual(mod._DataFilterProject({
					EASProjectPlatforms: {
						[Math.random().toString()]: {
							EASPlatformTagSources: [e],
						},
					},
				}), false);
			});

		});
	
	});

});

describe('_DataHotfixProject', function test__DataHotfixProject() {

	it('returns input', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod._DataHotfixProject(item), item);
	});

	context('EASProjectURL', function () {
		
		Object.entries({
			'https://element.im': 'https://element.io',
			'http://grafana.org/': 'https://grafana.com',
			'https://lycheeorg.github.io/': 'https://lychee.electerious.com',
			'https://github.com/tootsuite/mastodon': 'https://joinmastodon.org/',
			'https://github.com/opf/openproject': 'https://www.openproject.org/',
			'https://github.com/Chocobozzz/PeerTube': 'https://joinpeertube.org',
			'www.phpservermonitor.org': 'https://www.phpservermonitor.org/',
			'https://wekan.io': 'https://wekan.github.io',
			'https://github.com/YOURLS/YOURLS': 'https://yourls.org',
			'https://gitlab.com': 'https://about.gitlab.com',
			'https://git.sr.ht/~cadence/bibliogram': 'https://bibliogram.art',
			'https://meet-app.io': 'https://kopano.com/products/meet/',
			'https://asciimoo.github.io/searx/': 'https://searx.github.io/searx/',
			'https://streamaserver.org/': 'https://docs.streama-project.com',
			'www.bludit.com': 'https://www.bludit.com',
			'www.concrete5.org': 'https://www.concrete5.org',
			'www.universalmediaserver.com': 'https://www.universalmediaserver.com',
			'http://leed.idleman.fr/': 'https://github.com/LeedRSS/Leed',
		}).forEach(function ([key, value]) {
			
			it(`hotfixes ${ key }`, function () {
				deepEqual(mod._DataHotfixProject({
					EASProjectURL: key,
				}), {
					EASProjectURL: value,
				});
			});

		});
	
	});

});

describe('_DataMergeProjects', function test__DataMergeProjects() {

	const __DataMergeProjects = function (param1, param2) {
		const EASProjectURL = Math.random().toString();
		return mod._DataMergeProjects([Object.assign({
			EASProjectURL,
		}, param1), Object.assign({
			EASProjectURL,
		}, param2)]).map(function (e) {
			delete e.EASProjectURL;

			return e
		});
	};

	it('throws if not array', function () {
		throws(function () {
			mod._DataMergeProjects(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = {
			EASProjectURL: Math.random().toString(),
		};
		deepEqual(mod._DataMergeProjects([item]), [item]);
	});

	it('excludes if no EASProjectURL', function () {
		deepEqual(mod._DataMergeProjects([{}]), []);
	});

	it('excludes WordPress (Developer)', function () {
		deepEqual(mod._DataMergeProjects([{
			EASProjectPlatforms: {
				[Math.random().toString()]: {
					EASPlatformName: 'WordPress (Developer)',
				},
			},
		}]), []);
	});

	it('merges if EASProjectURL exact', function () {
		const EASProjectURL = Math.random().toString();
		deepEqual(mod._DataMergeProjects([{
			EASProjectURL,
		}, {
			EASProjectURL,
		}]), [{
			EASProjectURL,
		}]);
	});

	it('merges if EASProjectURL trailing slash', function () {
		const EASProjectURL = Math.random().toString();
		deepEqual(mod._DataMergeProjects([{
			EASProjectURL,
		}, {
			EASProjectURL: EASProjectURL + '/',
		}]), [{
			EASProjectURL,
		}]);
	});

	it('merges if EASPlatformCaprover.EASPlatformName matches existing EASPlatformName', function () {
		const existing = Math.random().toString();
		const EASProjectURL = Math.random().toString();
		const EASPlatformName = Math.random().toString() + 'alfa';
		deepEqual(mod._DataMergeProjects([{
			EASProjectURL,
			EASProjectPlatforms: {
				[existing]: {
					EASPlatformName,
				},
			},
		}, {
			EASProjectURL: undefined,
			EASProjectPlatforms: {
				EASPlatformCaprover: {
					EASPlatformName: EASPlatformName.toUpperCase(),
				},
			},
		}]), [{
			EASProjectURL,
			EASProjectPlatforms: {
				[existing]: {
					EASPlatformName,
				},
				EASPlatformCaprover: {
					EASPlatformName: EASPlatformName.toUpperCase(),
				},
			},
		}]);
	});

	it('copies properties', function () {
		const alfa = Math.random().toString();
		const bravo = Math.random().toString();
		deepEqual(__DataMergeProjects({
			alfa
		}, {
			bravo
		}), [{
			alfa,
			bravo
		}]);
	});

	it('copies EASProjectPlatforms', function () {
		const alfa = Math.random().toString();
		const bravo = Math.random().toString();
		deepEqual(__DataMergeProjects({
			EASProjectPlatforms: {
				alfa,
			},
		}, {
			EASProjectPlatforms: {
				bravo,
			},
		}), [{
			EASProjectPlatforms: {
				alfa,
				bravo,
			},
		}]);
	});

});

describe('__DataTidyTags', function test___DataTidyTags() {

	it('throws if not array', function () {
		throws(function () {
			mod.__DataTidyTags(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = Math.random().toString();
		deepEqual(mod.__DataTidyTags([item]), [item]);
	});

	it('splits comma-separated', function () {
		deepEqual(mod.__DataTidyTags(['alfa, bravo, charlie']), ['alfa', 'bravo', 'charlie']);
	});

	it('splits ampersand', function () {
		deepEqual(mod.__DataTidyTags(['alfa & bravo']), ['alfa', 'bravo']);
	});

	it('splits and', function () {
		deepEqual(mod.__DataTidyTags(['alfa and bravo']), ['alfa', 'bravo']);
	});

	it('splits or', function () {
		deepEqual(mod.__DataTidyTags(['alfa or bravo']), ['alfa', 'bravo']);
	});

	it('purges ...', function () {
		deepEqual(mod.__DataTidyTags(['alfa...']), ['alfa']);
	});

});

describe('_DataFillProjects', function test__DataFillProjects() {

	it('throws if not array', function () {
		throws(function () {
			mod._DataFillProjects(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod._DataFillProjects([item]), [item]);
	});

	context('EASProjectName', function () {
		
		it('copies EASPlatformName', function () {
			const EASPlatformName = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformName,
					},
				},
			}])[0].EASProjectName, EASPlatformName);
		});

		it('select first EASPlatformName', function () {
			const EASPlatformName = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformName,
					},
					[Math.random().toString()]: {
						EASPlatformName: Math.random().toString(),
					},
				},
			}])[0].EASProjectName, EASPlatformName);
		});
	
	});

	context('EASProjectID', function () {
		
		it('copies EASProjectName', function () {
			const EASProjectID = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectName: EASProjectID,
			}])[0].EASProjectID, EASProjectID);
		});

		it('converts to lower case', function () {
			const EASProjectID = 'ALFA' + Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectName: EASProjectID,
			}])[0].EASProjectID, EASProjectID.toLowerCase());
		});

		it('replaces spaces', function () {
			const EASProjectID = 'alfa ' + Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectName: EASProjectID,
			}])[0].EASProjectID, EASProjectID.split(' ').join('-'));
		});


		it('throws if duplicate', function () {
			const EASProjectName = Math.random().toString();
			throws(function () {
				mod._DataFillProjects(mod._DataFillProjects([{
					EASProjectName,
				}, {
					EASProjectName,
				}]));
			}, /EASErrorInputNotValid/);
		});
	
	});

	context('EASProjectBlurb', function () {
		
		it('copies EASPlatformBlurb', function () {
			const EASPlatformBlurb = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformBlurb,
					},
				},
			}])[0].EASProjectBlurb, EASPlatformBlurb);
		});

		it('select first EASPlatformBlurb', function () {
			const EASPlatformBlurb = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformBlurb,
					},
					[Math.random().toString()]: {
						EASPlatformBlurb: Math.random().toString(),
					},
				},
			}])[0].EASProjectBlurb, EASPlatformBlurb);
		});
	
	});

	context('EASProjectIconURL', function () {
		
		it('copies EASPlatformImageURL', function () {
			const EASPlatformImageURL = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformImageURL,
					},
				},
			}])[0].EASProjectIconURL, EASPlatformImageURL);
		});

		it('select first EASPlatformImageURL', function () {
			const EASPlatformImageURL = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformImageURL,
					},
					[Math.random().toString()]: {
						EASPlatformImageURL: Math.random().toString(),
					},
				},
			}])[0].EASProjectIconURL, EASPlatformImageURL);
		});
	
	});

	context('EASProjectTags', function () {
		
		it('adds EASPlatformCategory', function () {
			const EASPlatformCategory = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformCategory,
					},
				},
			}])[0].EASProjectTags, [EASPlatformCategory]);
		});

		it('adds EASPlatformTagSources', function () {
			const EASPlatformTagSources = [Math.random().toString()];
			deepEqual(mod._DataFillProjects([{
				EASProjectPlatforms: {
					[Math.random().toString()]: {
						EASPlatformTagSources,
					},
				},
			}])[0].EASProjectTags, EASPlatformTagSources);
		});

	});

});

describe('DataBankProjects', function test_DataBankProjects() {
	
	const _DataBankProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCacheObject: {},
			_DataBankObjects: (function () {
				return [];
			}),
		}, inputData).DataBankProjects();
	};

	it('calls _DataBankObjects', function () {
		const item = [];

		const _ValueCacheObject = EASPlatform.EASPlatformURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataBankProjects({
			_ValueCacheObject,
			_DataBankObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, EASPlatform.EASPlatformURLs().map(function (e) {
			return [e, _ValueCacheObject[e]];
		}));
	});

	it('trims properties', function () {
		const item = Math.random().toString();
		deepEqual(_DataBankProjects({
			_DataBankObjects: (function () {
				return [{
					EASProjectURL: arguments[0],
					[item]: ' ' + item + ' ',
				}];
			}),
		}), EASPlatform.EASPlatformURLs().reduce(function (coll, EASProjectURL) {
			return coll.concat({
				EASProjectURL,
				[item]: item,
			});
		}, []));
	});

	it('passes default value if cache empty', function () {
		deepEqual(_DataBankProjects({
			_DataBankObjects: mod._DataBankObjects,
		}), []);
	});

	it('calls _DataMergeProjects', function () {
		const item = Math.random().toString();
		deepEqual(_DataBankProjects({
			_DataBankObjects: (function () {
				return [{
					EASProjectURL: arguments[0],
					item,
				}];
			}),
			_DataMergeProjects: (function () {
				return [...arguments];
			}),
		}), [EASPlatform.EASPlatformURLs().reduce(function (coll, EASProjectURL) {
			return coll.concat({
				EASProjectURL,
				item,
			});
		}, [])]);
	});

	it('returns _DataFillProjects', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(_DataBankProjects({
			_DataMergeProjects: (function () {
				return [item];
			}),
			_DataFillProjects: (function () {
				return [...arguments].concat(item);
			}),
		}), [[item], item]);
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

describe('SetupBanksCache', function test_SetupBanksCache() {

	const _SetupBanksCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskRead: (function () {}),
			}, inputData),
		});
		return _mod.SetupBanksCache() || _mod;
	};

	it('calls OLSKDiskRead', function () {
		const items = [];

		_SetupBanksCache({
			OLSKDiskRead: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, EASPlatform.EASPlatformURLs().map(OLSKCache.OLSKCacheURLBasename).map(function (e) {
			return OLSKCache.OLSKCachePath(__dirname, e);
		}));
	});

	it('sets _ValueCacheObject', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupBanksCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueCacheObject, EASPlatform.EASPlatformURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: OLSKDiskRead,
			});
		}, {}));
	});

});

describe('_SetupBank', function test__SetupBank() {

	const __SetupBank = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupBank(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueCacheObject = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupBank({
			url,
			_ValueCacheObject,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueCacheObject,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupBank({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				_DataContentString: (function () {
					return [...arguments];
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKDiskWrite', async function () {
			const url = uLink();
			const data = Math.random().toString();
			
			deepEqual(await __SetupBank({
				url,
				_ValueCacheObject: {
					[url]: data,
				},
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKDiskWrite: (function () {
					return [...arguments];
				}),
			}), [OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(url)), data]);
		});
	
	});

});

describe('SetupBanks', function test_SetupBanks() {

	const _SetupBanks = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_SetupBank: (function () {}),
		}, inputData).SetupBanks();
	};

	it('calls _SetupBank', async function () {
		deepEqual(await _SetupBanks({
			_SetupBank: (function (e) {
				return e;
			}),
		}), EASPlatform.EASPlatformURLs());
	});

});