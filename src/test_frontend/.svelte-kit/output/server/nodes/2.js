

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.85565215.js","_app/immutable/chunks/scheduler.a75471c3.js","_app/immutable/chunks/index.3025f2c4.js","_app/immutable/chunks/index.be95db26.js","_app/immutable/chunks/index.6831a90a.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = ["_app/immutable/assets/2.d06c6180.css"];
export const fonts = [];
