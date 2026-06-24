-- This is an empty migration.
INSERT INTO
	"FrameworkType" ("name")
VALUES
	('Frontend'),
	('Backend'),
	('Fullstack'),
	('Autre');

INSERT INTO
	"CodingLanguage" ("name", "createdAt", "updatedAt")
VALUES
	('Python', datetime ('now'), datetime ('now')),
	('JavaScript', datetime ('now'), datetime ('now')),
	('TypeScript', datetime ('now'), datetime ('now')),
	('Java', datetime ('now'), datetime ('now')),
	('C#', datetime ('now'), datetime ('now')),
	('C', datetime ('now'), datetime ('now')),
	('Go', datetime ('now'), datetime ('now')),
	('Rust', datetime ('now'), datetime ('now')),
	('Ruby', datetime ('now'), datetime ('now')),
	('PHP', datetime ('now'), datetime ('now')),
	('Swift', datetime ('now'), datetime ('now')),
	('Kotlin', datetime ('now'), datetime ('now')),
	('Scala', datetime ('now'), datetime ('now')),
	('R', datetime ('now'), datetime ('now')),
	('Dart', datetime ('now'), datetime ('now')),
	('Elixir', datetime ('now'), datetime ('now')),
	('Haskell', datetime ('now'), datetime ('now')),
	('Lua', datetime ('now'), datetime ('now')),
	('Perl', datetime ('now'), datetime ('now')),
	('Julia', datetime ('now'), datetime ('now')),
	('Clojure', datetime ('now'), datetime ('now')),
	('F#', datetime ('now'), datetime ('now')),
	('Erlang', datetime ('now'), datetime ('now')),
	('Zig', datetime ('now'), datetime ('now')),
	('Nim', datetime ('now'), datetime ('now'));

INSERT INTO
	"Framework" (
		"name",
		"img",
		"codingLanguageId",
		"frameworkTypeId",
		"releasedAt",
		"createdAt",
		"updatedAt"
	)
VALUES
	-- JavaScript · Frontend
	(
		'React',
		'https://cdn.simpleicons.org/react',
		2,
		1,
		'2013-05-29T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Vue.js',
		'https://cdn.simpleicons.org/vuedotjs',
		2,
		1,
		'2014-02-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Svelte',
		'https://cdn.simpleicons.org/svelte',
		2,
		1,
		'2016-11-26T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Ember.js',
		'https://cdn.simpleicons.org/emberdotjs',
		2,
		1,
		'2011-12-08T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Backbone.js',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2010-10-13T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Preact',
		'https://cdn.simpleicons.org/preact',
		2,
		1,
		'2015-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Solid.js',
		'https://cdn.simpleicons.org/solid',
		2,
		1,
		'2021-04-27T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Alpine.js',
		'https://cdn.simpleicons.org/alpinedotjs',
		2,
		1,
		'2019-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Lit',
		'https://cdn.simpleicons.org/lit',
		2,
		1,
		'2019-02-05T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Stimulus',
		'https://cdn.simpleicons.org/stimulus',
		2,
		1,
		'2018-01-22T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Mithril.js',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2014-03-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Hyperapp',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2018-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Inferno',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2016-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'htmx',
		'https://cdn.simpleicons.org/htmx',
		2,
		1,
		'2020-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Marko',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2014-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'AngularJS',
		'https://cdn.simpleicons.org/angularjs',
		2,
		1,
		'2010-10-20T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Riot.js',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2013-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Aurelia',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2016-02-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Ractive.js',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2013-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Cycle.js',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2014-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Turbo',
		'https://cdn.simpleicons.org/javascript',
		2,
		1,
		'2021-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- JavaScript · Backend
	(
		'Express.js',
		'https://cdn.simpleicons.org/express',
		2,
		2,
		'2010-11-16T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Fastify',
		'https://cdn.simpleicons.org/fastify',
		2,
		2,
		'2016-09-13T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Hapi.js',
		'https://cdn.simpleicons.org/hapi',
		2,
		2,
		'2011-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Koa.js',
		'https://cdn.simpleicons.org/javascript',
		2,
		2,
		'2013-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Feathers.js',
		'https://cdn.simpleicons.org/feathersjs',
		2,
		2,
		'2012-04-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'LoopBack',
		'https://cdn.simpleicons.org/loopback',
		2,
		2,
		'2013-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Moleculer',
		'https://cdn.simpleicons.org/javascript',
		2,
		2,
		'2017-04-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Apollo Server',
		'https://cdn.simpleicons.org/apollographql',
		2,
		2,
		'2016-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'GraphQL Yoga',
		'https://cdn.simpleicons.org/graphql',
		2,
		2,
		'2020-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Medusa',
		'https://cdn.simpleicons.org/medusa',
		2,
		2,
		'2021-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Restify',
		'https://cdn.simpleicons.org/javascript',
		2,
		2,
		'2012-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Micro',
		'https://cdn.simpleicons.org/javascript',
		2,
		2,
		'2016-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- JavaScript · Fullstack
	(
		'Next.js',
		'https://cdn.simpleicons.org/nextdotjs',
		2,
		3,
		'2016-10-25T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Nuxt.js',
		'https://cdn.simpleicons.org/nuxtdotjs',
		2,
		3,
		'2016-10-26T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'SvelteKit',
		'https://cdn.simpleicons.org/svelte',
		2,
		3,
		'2020-10-14T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Gatsby',
		'https://cdn.simpleicons.org/gatsby',
		2,
		3,
		'2015-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Strapi',
		'https://cdn.simpleicons.org/strapi',
		2,
		3,
		'2015-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'RedwoodJS',
		'https://cdn.simpleicons.org/redwoodjs',
		2,
		3,
		'2020-03-11T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Blitz.js',
		'https://cdn.simpleicons.org/blitzjs',
		2,
		3,
		'2020-04-09T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Directus',
		'https://cdn.simpleicons.org/directus',
		2,
		3,
		'2012-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Payload CMS',
		'https://cdn.simpleicons.org/payloadcms',
		2,
		3,
		'2021-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Inertia.js',
		'https://cdn.simpleicons.org/javascript',
		2,
		3,
		'2019-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- JavaScript · Autre
	(
		'Electron',
		'https://cdn.simpleicons.org/electron',
		2,
		4,
		'2013-07-15T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'React Native',
		'https://cdn.simpleicons.org/react',
		2,
		4,
		'2015-03-26T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Expo',
		'https://cdn.simpleicons.org/expo',
		2,
		4,
		'2016-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Capacitor',
		'https://cdn.simpleicons.org/capacitor',
		2,
		4,
		'2019-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- TypeScript · Frontend
	(
		'Angular',
		'https://cdn.simpleicons.org/angular',
		3,
		1,
		'2016-09-14T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Qwik',
		'https://cdn.simpleicons.org/qwik',
		3,
		1,
		'2022-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Stencil',
		'https://cdn.simpleicons.org/stencil',
		3,
		1,
		'2017-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Ionic',
		'https://cdn.simpleicons.org/ionic',
		3,
		1,
		'2013-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'NativeScript',
		'https://cdn.simpleicons.org/nativescript',
		3,
		1,
		'2014-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- TypeScript · Backend
	(
		'NestJS',
		'https://cdn.simpleicons.org/nestjs',
		3,
		2,
		'2017-10-17T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'AdonisJS',
		'https://cdn.simpleicons.org/adonisjs',
		3,
		2,
		'2015-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'tRPC',
		'https://cdn.simpleicons.org/trpc',
		3,
		2,
		'2021-03-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Hono',
		'https://cdn.simpleicons.org/hono',
		3,
		2,
		'2022-01-10T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Elysia',
		'https://cdn.simpleicons.org/elysia',
		3,
		2,
		'2023-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Oak',
		'https://cdn.simpleicons.org/deno',
		3,
		2,
		'2019-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- TypeScript · Fullstack
	(
		'Remix',
		'https://cdn.simpleicons.org/remix',
		3,
		3,
		'2021-11-22T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Astro',
		'https://cdn.simpleicons.org/astro',
		3,
		3,
		'2021-06-08T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'KeystoneJS',
		'https://cdn.simpleicons.org/javascript',
		3,
		3,
		'2013-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'SolidStart',
		'https://cdn.simpleicons.org/solid',
		3,
		3,
		'2022-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Analog',
		'https://cdn.simpleicons.org/angular',
		3,
		3,
		'2023-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Fresh',
		'https://cdn.simpleicons.org/deno',
		3,
		3,
		'2022-06-28T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- TypeScript · Autre
	(
		'Tauri',
		'https://cdn.simpleicons.org/tauri',
		3,
		4,
		'2021-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Python · Backend
	(
		'Django',
		'https://cdn.simpleicons.org/django',
		1,
		2,
		'2005-07-15T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Flask',
		'https://cdn.simpleicons.org/flask',
		1,
		2,
		'2010-04-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'FastAPI',
		'https://cdn.simpleicons.org/fastapi',
		1,
		2,
		'2018-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Tornado',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2009-09-10T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Falcon',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2012-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Bottle',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2009-07-30T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Starlette',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2018-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Sanic',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2016-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'aiohttp',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2013-03-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Litestar',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2021-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Pyramid',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2005-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Robyn',
		'https://cdn.simpleicons.org/python',
		1,
		2,
		'2021-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Channels',
		'https://cdn.simpleicons.org/django',
		1,
		2,
		'2014-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Python · Frontend
	(
		'Dash',
		'https://cdn.simpleicons.org/plotly',
		1,
		1,
		'2017-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Streamlit',
		'https://cdn.simpleicons.org/streamlit',
		1,
		1,
		'2019-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Python · Fullstack
	(
		'Reflex',
		'https://cdn.simpleicons.org/python',
		1,
		3,
		'2022-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Java · Backend
	(
		'Spring Boot',
		'https://cdn.simpleicons.org/springboot',
		4,
		2,
		'2014-04-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Quarkus',
		'https://cdn.simpleicons.org/quarkus',
		4,
		2,
		'2019-03-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Micronaut',
		'https://cdn.simpleicons.org/micronaut',
		4,
		2,
		'2018-05-23T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Vert.x',
		'https://cdn.simpleicons.org/eclipsevertdotx',
		4,
		2,
		'2011-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Dropwizard',
		'https://cdn.simpleicons.org/java',
		4,
		2,
		'2011-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Helidon',
		'https://cdn.simpleicons.org/java',
		4,
		2,
		'2018-09-07T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Javalin',
		'https://cdn.simpleicons.org/java',
		4,
		2,
		'2017-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Spark Java',
		'https://cdn.simpleicons.org/java',
		4,
		2,
		'2011-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Struts',
		'https://cdn.simpleicons.org/apachestruts',
		4,
		2,
		'2001-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Java · Fullstack
	(
		'Grails',
		'https://cdn.simpleicons.org/grails',
		4,
		3,
		'2005-03-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Play Framework',
		'https://cdn.simpleicons.org/java',
		4,
		3,
		'2007-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- C# · Backend
	(
		'ASP.NET Core',
		'https://cdn.simpleicons.org/dotnet',
		5,
		2,
		'2016-06-27T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'ASP.NET MVC',
		'https://cdn.simpleicons.org/dotnet',
		5,
		2,
		'2009-03-13T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Nancy',
		'https://cdn.simpleicons.org/dotnet',
		5,
		2,
		'2010-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'ServiceStack',
		'https://cdn.simpleicons.org/dotnet',
		5,
		2,
		'2009-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- C# · Frontend
	(
		'Blazor',
		'https://cdn.simpleicons.org/blazor',
		5,
		1,
		'2018-03-22T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- C# · Fullstack
	(
		'Uno Platform',
		'https://cdn.simpleicons.org/dotnet',
		5,
		3,
		'2018-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- C# · Autre
	(
		'MAUI',
		'https://cdn.simpleicons.org/dotnet',
		5,
		4,
		'2022-05-23T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'WPF',
		'https://cdn.simpleicons.org/dotnet',
		5,
		4,
		'2006-11-21T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Go · Backend
	(
		'Gin',
		'https://cdn.simpleicons.org/gin',
		7,
		2,
		'2014-06-16T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Echo',
		'https://cdn.simpleicons.org/go',
		7,
		2,
		'2015-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Fiber',
		'https://cdn.simpleicons.org/go',
		7,
		2,
		'2020-01-16T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Chi',
		'https://cdn.simpleicons.org/go',
		7,
		2,
		'2015-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Gorilla Mux',
		'https://cdn.simpleicons.org/go',
		7,
		2,
		'2012-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Goa',
		'https://cdn.simpleicons.org/go',
		7,
		2,
		'2015-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Iris',
		'https://cdn.simpleicons.org/go',
		7,
		2,
		'2016-03-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Go · Fullstack
	(
		'Beego',
		'https://cdn.simpleicons.org/go',
		7,
		3,
		'2012-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Buffalo',
		'https://cdn.simpleicons.org/go',
		7,
		3,
		'2016-02-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Revel',
		'https://cdn.simpleicons.org/go',
		7,
		3,
		'2011-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Rust · Backend
	(
		'Actix Web',
		'https://cdn.simpleicons.org/actix',
		8,
		2,
		'2017-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Rocket',
		'https://cdn.simpleicons.org/rocket',
		8,
		2,
		'2016-12-23T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Axum',
		'https://cdn.simpleicons.org/rust',
		8,
		2,
		'2021-07-30T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Warp',
		'https://cdn.simpleicons.org/rust',
		8,
		2,
		'2018-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Tide',
		'https://cdn.simpleicons.org/rust',
		8,
		2,
		'2019-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Poem',
		'https://cdn.simpleicons.org/rust',
		8,
		2,
		'2021-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Salvo',
		'https://cdn.simpleicons.org/rust',
		8,
		2,
		'2021-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Rust · Frontend
	(
		'Leptos',
		'https://cdn.simpleicons.org/rust',
		8,
		1,
		'2022-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Yew',
		'https://cdn.simpleicons.org/rust',
		8,
		1,
		'2019-01-06T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Dioxus',
		'https://cdn.simpleicons.org/rust',
		8,
		1,
		'2021-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Ruby · Backend
	(
		'Sinatra',
		'https://cdn.simpleicons.org/ruby',
		9,
		2,
		'2007-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Hanami',
		'https://cdn.simpleicons.org/ruby',
		9,
		2,
		'2014-06-23T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Grape',
		'https://cdn.simpleicons.org/ruby',
		9,
		2,
		'2010-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Padrino',
		'https://cdn.simpleicons.org/ruby',
		9,
		2,
		'2009-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Roda',
		'https://cdn.simpleicons.org/ruby',
		9,
		2,
		'2014-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Cuba',
		'https://cdn.simpleicons.org/ruby',
		9,
		2,
		'2011-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Ruby · Fullstack
	(
		'Ruby on Rails',
		'https://cdn.simpleicons.org/rubyonrails',
		9,
		3,
		'2004-07-25T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Camping',
		'https://cdn.simpleicons.org/ruby',
		9,
		3,
		'2004-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- PHP · Backend
	(
		'Symfony',
		'https://cdn.simpleicons.org/symfony',
		10,
		2,
		'2005-10-22T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'CodeIgniter',
		'https://cdn.simpleicons.org/codeigniter',
		10,
		2,
		'2006-02-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Yii',
		'https://cdn.simpleicons.org/php',
		10,
		2,
		'2008-12-03T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Phalcon',
		'https://cdn.simpleicons.org/php',
		10,
		2,
		'2012-11-14T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Slim',
		'https://cdn.simpleicons.org/slim',
		10,
		2,
		'2010-09-04T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Laminas',
		'https://cdn.simpleicons.org/php',
		10,
		2,
		'2019-12-12T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Lumen',
		'https://cdn.simpleicons.org/laravel',
		10,
		2,
		'2015-04-14T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'FuelPHP',
		'https://cdn.simpleicons.org/php',
		10,
		2,
		'2011-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- PHP · Fullstack
	(
		'Laravel',
		'https://cdn.simpleicons.org/laravel',
		10,
		3,
		'2011-06-09T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'CakePHP',
		'https://cdn.simpleicons.org/cakephp',
		10,
		3,
		'2005-04-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'WordPress',
		'https://cdn.simpleicons.org/wordpress',
		10,
		3,
		'2003-05-27T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Swift · Backend
	(
		'Vapor',
		'https://cdn.simpleicons.org/vapor',
		11,
		2,
		'2016-01-26T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Hummingbird',
		'https://cdn.simpleicons.org/swift',
		11,
		2,
		'2021-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Perfect',
		'https://cdn.simpleicons.org/swift',
		11,
		2,
		'2015-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Swift · Frontend
	(
		'SwiftUI',
		'https://cdn.simpleicons.org/swift',
		11,
		1,
		'2019-06-03T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'UIKit',
		'https://cdn.simpleicons.org/swift',
		11,
		1,
		'2008-03-06T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Kotlin · Backend
	(
		'Ktor',
		'https://cdn.simpleicons.org/ktor',
		12,
		2,
		'2018-11-09T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Kotlin · Frontend
	(
		'Jetpack Compose',
		'https://cdn.simpleicons.org/jetpackcompose',
		12,
		1,
		'2021-07-28T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Scala · Backend
	(
		'Akka HTTP',
		'https://cdn.simpleicons.org/scala',
		13,
		2,
		'2014-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'http4s',
		'https://cdn.simpleicons.org/scala',
		13,
		2,
		'2013-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'ZIO HTTP',
		'https://cdn.simpleicons.org/scala',
		13,
		2,
		'2021-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Finatra',
		'https://cdn.simpleicons.org/scala',
		13,
		2,
		'2012-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Scalatra',
		'https://cdn.simpleicons.org/scala',
		13,
		2,
		'2009-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Scala · Fullstack
	(
		'Play (Scala)',
		'https://cdn.simpleicons.org/scala',
		13,
		3,
		'2007-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Dart · Backend
	(
		'Shelf',
		'https://cdn.simpleicons.org/dart',
		15,
		2,
		'2014-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Angel3',
		'https://cdn.simpleicons.org/dart',
		15,
		2,
		'2016-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Dart · Frontend
	(
		'Flutter',
		'https://cdn.simpleicons.org/flutter',
		15,
		1,
		'2018-06-04T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Elixir · Backend
	(
		'Plug',
		'https://cdn.simpleicons.org/elixir',
		16,
		2,
		'2014-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Commanded',
		'https://cdn.simpleicons.org/elixir',
		16,
		2,
		'2017-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Elixir · Fullstack
	(
		'Phoenix',
		'https://cdn.simpleicons.org/phoenixframework',
		16,
		3,
		'2014-08-24T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Ash',
		'https://cdn.simpleicons.org/elixir',
		16,
		3,
		'2020-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Elixir · Autre
	(
		'Nerves',
		'https://cdn.simpleicons.org/elixir',
		16,
		4,
		'2015-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Haskell · Backend
	(
		'Servant',
		'https://cdn.simpleicons.org/haskell',
		17,
		2,
		'2014-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Scotty',
		'https://cdn.simpleicons.org/haskell',
		17,
		2,
		'2012-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Snap',
		'https://cdn.simpleicons.org/haskell',
		17,
		2,
		'2010-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Wai',
		'https://cdn.simpleicons.org/haskell',
		17,
		2,
		'2010-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Haskell · Fullstack
	(
		'Yesod',
		'https://cdn.simpleicons.org/haskell',
		17,
		3,
		'2009-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'IHP',
		'https://cdn.simpleicons.org/haskell',
		17,
		3,
		'2020-07-06T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Lua · Backend
	(
		'OpenResty',
		'https://cdn.simpleicons.org/lua',
		18,
		2,
		'2009-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Lapis',
		'https://cdn.simpleicons.org/lua',
		18,
		2,
		'2013-04-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Lua · Fullstack
	(
		'Sailor',
		'https://cdn.simpleicons.org/lua',
		18,
		3,
		'2014-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- R · Frontend
	(
		'Shiny',
		'https://cdn.simpleicons.org/r',
		14,
		1,
		'2012-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- R · Backend
	(
		'Plumber',
		'https://cdn.simpleicons.org/r',
		14,
		2,
		'2015-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Ambiorix',
		'https://cdn.simpleicons.org/r',
		14,
		2,
		'2021-03-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Perl · Backend
	(
		'Mojolicious',
		'https://cdn.simpleicons.org/perl',
		19,
		2,
		'2010-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Dancer2',
		'https://cdn.simpleicons.org/perl',
		19,
		2,
		'2012-07-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Catalyst',
		'https://cdn.simpleicons.org/perl',
		19,
		2,
		'2004-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Perl · Fullstack
	(
		'Plack',
		'https://cdn.simpleicons.org/perl',
		19,
		3,
		'2009-10-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Julia · Backend
	(
		'Oxygen.jl',
		'https://cdn.simpleicons.org/julia',
		20,
		2,
		'2022-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Julia · Frontend
	(
		'Franklin.jl',
		'https://cdn.simpleicons.org/julia',
		20,
		1,
		'2019-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Julia · Fullstack
	(
		'Genie.jl',
		'https://cdn.simpleicons.org/julia',
		20,
		3,
		'2018-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Clojure · Backend
	(
		'Ring',
		'https://cdn.simpleicons.org/clojure',
		21,
		2,
		'2009-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Compojure',
		'https://cdn.simpleicons.org/clojure',
		21,
		2,
		'2008-09-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Pedestal',
		'https://cdn.simpleicons.org/clojure',
		21,
		2,
		'2013-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Reitit',
		'https://cdn.simpleicons.org/clojure',
		21,
		2,
		'2018-11-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Clojure · Fullstack
	(
		'Luminus',
		'https://cdn.simpleicons.org/clojure',
		21,
		3,
		'2012-08-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Biff',
		'https://cdn.simpleicons.org/clojure',
		21,
		3,
		'2021-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- F# · Backend
	(
		'Giraffe',
		'https://cdn.simpleicons.org/fsharp',
		22,
		2,
		'2017-02-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Falco',
		'https://cdn.simpleicons.org/fsharp',
		22,
		2,
		'2020-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- F# · Fullstack
	(
		'Saturn',
		'https://cdn.simpleicons.org/fsharp',
		22,
		3,
		'2018-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Erlang · Backend
	(
		'Cowboy',
		'https://cdn.simpleicons.org/erlang',
		23,
		2,
		'2011-06-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Webmachine',
		'https://cdn.simpleicons.org/erlang',
		23,
		2,
		'2007-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'MochiWeb',
		'https://cdn.simpleicons.org/erlang',
		23,
		2,
		'2008-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Erlang · Fullstack
	(
		'Chicago Boss',
		'https://cdn.simpleicons.org/erlang',
		23,
		3,
		'2010-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'N2O',
		'https://cdn.simpleicons.org/erlang',
		23,
		3,
		'2013-05-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Zig · Backend
	(
		'Zap',
		'https://cdn.simpleicons.org/zig',
		24,
		2,
		'2022-12-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	(
		'Tokamak',
		'https://cdn.simpleicons.org/zig',
		24,
		2,
		'2023-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Nim · Backend
	(
		'Jester',
		'https://cdn.simpleicons.org/nim',
		25,
		2,
		'2012-01-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	),
	-- Nim · Fullstack
	(
		'Prologue',
		'https://cdn.simpleicons.org/nim',
		25,
		3,
		'2020-04-01T00:00:00.000Z',
		datetime ('now'),
		datetime ('now')
	);