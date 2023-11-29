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

			return `{"apps": [{"id": "${ item.EASPlatformCues.id }","creationDate": "${ item.EASPlatformCues.creationDate }","publishState": "${ item.EASPlatformCues.publishState }","ownerId": "cd00534b-edca-4ea1-a88b-ee99603a4282","userId": "cd00534b-edca-4ea1-a88b-ee99603a4282","visibility": "${ item.EASPlatformCues.visibility }","releaseState": "${ item.EASPlatformCues.releaseState }","repository": "core","ts": "2022-08-18T20:46:12.000Z","publishedAt": "2022-08-18T20:46:12.000Z","manifest": {"id": "app.immich.cloudronapp","title": "${ item.EASPlatformName }","version": "1.3.1","upstreamVersion": "1.36.2","tagline": "${ item.EASPlatformBlurb }","website": "${ item.EASProjectURL }","author": "Alex Tran","contactEmail": "support@cloudron.io","minBoxVersion": "7.2.0","healthCheckPath": "/","icon": "file://logo.png","description": "**WARNING: NOT READY FOR PRODUCTION! DO NOT USE TO STORE YOUR ASSETS. This project is under heavy development, there will be continuous functions, features and api changes.**IMMICH ( /ˈimij/ ) is an open source, high performance backup solution for videos and photos on your mobile phone.### Features* Upload and view videos and photos* Auto backup when the app is opened* Selective album(s) for backup* Download photos and videos to local device* Multi-user support* Album* Shared Albums* Quick navigation with draggable scrollbar* Support RAW (HEIC, HEIF, DNG, Apple ProRaw)* Metadata view (EXIF, map)* Search by metadata, objects and image tags* Administrative functions (user management)* Background backup* Virtual scroll## Mobile Apps* [Android](https://play.google.com/store/apps/details?id=app.alextran.immich)* [iOS](https://apps.apple.com/us/app/immich/id1613945652)","postInstallMessage": "On first visit an admin account needs to be created.","changelog": "* Update Immich to 1.36.2* [Full changelog](https://github.com/immich-app/immich/releases/tag/v1.36.2_56-dev)* fix(server): Deleted shared users cause a problem with album retrieval and creation by @alextran1502 in https://github.com/immich-app/immich/pull/1002","tags": ${ JSON.stringify(item.EASPlatformTagSources) },"httpPort": 8080,"memoryLimit": 2122317824,"addons": {"localstorage": {},"postgresql": {},"redis": {}},"mediaLinks": ["https://screenshots.cloudron.io/app.immich.cloudronapp/immich-0.png","https://screenshots.cloudron.io/app.immich.cloudronapp/immich-1.png","https://screenshots.cloudron.io/app.immich.cloudronapp/immich-2.jpeg"],"documentationUrl": "${ item.EASPlatformDocsPath }","forumUrl": "https://forum.cloudron.io/category/151/immich","manifestVersion": 2,"dockerImage": "cloudron/app.immich.cloudronapp:20221122-100159-980bdffbd"},"iconUrl": "${ item.EASPlatformImageURL }","featured": ${ item.EASPlatformCues.featured },"ranking": ${ item.EASPlatformCues.ranking },"installCount": ${ item.EASPlatformCues.installCount }}],"isLastPage": true}`;
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

	context('Awesome', function test_Awesome () {
		
		it('parses data', function () {
			deepEqual(mod._DataBankObjects(EASPlatform.EASPlatformURLAwesome(), Math.random().toString()), []);
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
			'my_capsule',
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
			'https://grafana.com/oss/grafana/': 'https://grafana.com',
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
			'https://adguard.com/adguard-home.html': 'https://adguard.com/en/adguard-home/overview.html',
			'https://github.com/PrivateBin/PrivateBin': 'https://privatebin.info',
			'http://kanboard.net/': 'https://kanboard.org',
			'https://kanboard.net': 'https://kanboard.org',
			'https://mailtrain.org/': 'https://github.com/Mailtrain-org/mailtrain',
			'https://www.cheky.net/': 'https://github.com/Blount/Cheky',
			'https://github.com/mastodon/mastodon': 'https://joinmastodon.org',
			'https://paperless-ngx.com': 'https://paperless-ng.readthedocs.io',
			'www.getoutline.com': 'https://www.getoutline.com',
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

			return e;
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

		it.skip('throws if duplicate', function () {
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
			_OLSKCacheResultMap: {},
			_DataBankObjects: (function () {
				return [];
			}),
		}, inputData).DataBankProjects();
	};

	it('calls _DataBankObjects', function () {
		const item = [];

		const _OLSKCacheResultMap = EASPlatform.EASPlatformURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataBankProjects({
			_OLSKCacheResultMap,
			_DataBankObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, EASPlatform.EASPlatformURLs().map(function (e) {
			return [e, _OLSKCacheResultMap[e]];
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

describe('_DataBankPlatformObjects', function test__DataBankPlatformObjects() {

	const uBank = function (inputData = {}) {
		const item = Object.assign({
			EASPlatformURL: Math.random().toString(),
			EASPlatformName: Math.random().toString(),
			EASPlatformIconURL: Math.random().toString(),
		}, inputData);

		return `# [Easy Indie](https://easyindie.app) Platforms\n<table><tr><td><img src="${ item.EASPlatformIconURL }" /></td><td><a href="${ item.EASPlatformURL }">${ item.EASPlatformName }</a></td></tr></table>\n#`;
	};

	it('throws if not string', function () {
		throws(function () {
			mod._DataBankPlatformObjects(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataBankPlatformObjects(''), []);
	});

	it('parses data', function () {
		const EASPlatformURL = Math.random().toString();
		const EASPlatformName = Math.random().toString();
		const EASPlatformIconURL = Math.random().toString();

		deepEqual(mod._DataBankPlatformObjects(uBank({
			EASPlatformURL,
			EASPlatformName,
			EASPlatformIconURL,
		})), [{
			EASPlatformURL,
			EASPlatformName,
			EASPlatformIconURL,
		}]);
	});

});

describe('DataBankPlatforms', function test_DataBankPlatforms() {

	const _DataBankPlatforms = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataBankPlatformObjects: (function () {}),
		}, inputData);
		return _mod.DataBankPlatforms() || _mod;
	};

	it('calls _DataBankPlatformObjects', function () {
		const item = Math.random().toString();
		deepEqual(uCapture(function (capture) {
			_DataBankPlatforms({
				_OLSKCacheResultMap: {
					[EASPlatform.EASPlatformURLAwesome()]: item,
				},
				_DataBankPlatformObjects: (function () {
					capture(...arguments);
					
					return [];
				}),
			});
		}), [item]);
	});

});

describe('_DataBankAlternativeObjects', function test__DataBankAlternativeObjects() {

	const uBank = function (inputData = {}) {
		const item = Object.assign({
			EASAlternativeURL: Math.random().toString(),
			EASAlternativeName: Math.random().toString(),
			EASAlternativeBlurb: Math.random().toString(),
		}, inputData);

		return `# More self-hosting projects\n- [${ item.EASAlternativeName }](${ item.EASAlternativeURL }): ${ item.EASAlternativeBlurb }\n#`;
	};

	it('throws if not string', function () {
		throws(function () {
			mod._DataBankAlternativeObjects(null);
		}, /EASErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataBankAlternativeObjects(''), []);
	});

	it('parses data', function () {
		const EASAlternativeURL = Math.random().toString();
		const EASAlternativeName = Math.random().toString();
		const EASAlternativeBlurb = Math.random().toString();

		deepEqual(mod._DataBankAlternativeObjects(uBank({
			EASAlternativeURL,
			EASAlternativeName,
			EASAlternativeBlurb,
		})), [{
			EASAlternativeURL,
			EASAlternativeName,
			EASAlternativeBlurb,
		}]);
	});

});

describe('DataBankAlternatives', function test_DataBankAlternatives() {

	const _DataBankAlternatives = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataBankAlternativeObjects: (function () {}),
		}, inputData);
		return _mod.DataBankAlternatives() || _mod;
	};

	it('calls _DataBankAlternativeObjects', function () {
		const item = Math.random().toString();
		deepEqual(uCapture(function (_DataBankAlternativeObjects) {
			_DataBankAlternatives({
				_OLSKCacheResultMap: {
					[EASPlatform.EASPlatformURLAwesome]: item,
				},
				_DataBankAlternativeObjects,
			});
		}), [item]);
	});

});

describe('_SetupBank', function test__SetupBank() {

	const __SetupBank = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentJSON: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheQueuedFetch: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupBank(inputData.ParamKey || Math.random().toString());
	};
	
	it('calls OLSKCacheQueuedFetch', function () {
		const ParamKey = Math.random().toString();
		const OLSKDisk = {};
		const item = (uCapture(function (OLSKCacheQueuedFetch) {
			__SetupBank({
				ParamKey,

				OLSKCacheQueuedFetch,
				_DataFoilOLSKDisk: OLSKDisk,
			});
		})).pop();

		deepEqual(item, {
			ParamMod: mod,
			ParamKey,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			ParamFileURLs: EASPlatform.EASPlatformURLs(),
			ParamFileDirectory: __dirname,
			OLSKQueue: require('OLSKQueue'),
			OLSKDisk,
		});
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', async function () {
			const ParamKey = Math.random().toString();
			deepEqual(await __SetupBank({
				ParamKey,
				OLSKCacheQueuedFetch: (function (inputData) {
					return inputData.ParamCallback();
				}),
				_DataContentString: (function () {
					return [...arguments];
				}),
			}), [ParamKey]);
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
