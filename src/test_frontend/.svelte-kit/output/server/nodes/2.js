

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.7c5b2b19.js","_app/immutable/chunks/scheduler.0f962ddd.js","_app/immutable/chunks/index.7e80be4e.js","_app/immutable/chunks/index.ba2d21ea.js","_app/immutable/chunks/index.6831a90a.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = ["_app/immutable/assets/2.e09715e5.css"];
export const fonts = [];
