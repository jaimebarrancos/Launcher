

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.aa31081b.js","_app/immutable/chunks/scheduler.0f962ddd.js","_app/immutable/chunks/index.7e80be4e.js","_app/immutable/chunks/singletons.d478551d.js","_app/immutable/chunks/index.ba2d21ea.js"];
export const stylesheets = [];
export const fonts = [];
