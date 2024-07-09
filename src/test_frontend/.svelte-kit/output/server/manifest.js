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
		client: {"start":"_app/immutable/entry/start.2a34ef28.js","app":"_app/immutable/entry/app.84b65ae5.js","imports":["_app/immutable/entry/start.2a34ef28.js","_app/immutable/chunks/scheduler.a75471c3.js","_app/immutable/chunks/singletons.36f371df.js","_app/immutable/chunks/index.be95db26.js","_app/immutable/entry/app.84b65ae5.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.a75471c3.js","_app/immutable/chunks/index.3025f2c4.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
