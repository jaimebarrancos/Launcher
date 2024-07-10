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
		client: {"start":"_app/immutable/entry/start.5f626bed.js","app":"_app/immutable/entry/app.dfeb561d.js","imports":["_app/immutable/entry/start.5f626bed.js","_app/immutable/chunks/scheduler.0f962ddd.js","_app/immutable/chunks/singletons.d478551d.js","_app/immutable/chunks/index.ba2d21ea.js","_app/immutable/entry/app.dfeb561d.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.0f962ddd.js","_app/immutable/chunks/index.7e80be4e.js"],"stylesheets":[],"fonts":[]},
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
