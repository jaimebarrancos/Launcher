export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".ic-assets.json5","favicon.ico","logo2.svg"]),
	mimeTypes: {".json5":"application/json5",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.7579ba08.js","app":"_app/immutable/entry/app.3060b3f6.js","imports":["_app/immutable/entry/start.7579ba08.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/singletons.84058b3c.js","_app/immutable/chunks/index.35a173b3.js","_app/immutable/entry/app.3060b3f6.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/index.e159bb4a.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
