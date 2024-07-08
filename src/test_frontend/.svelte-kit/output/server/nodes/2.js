

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.391a2521.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/index.e159bb4a.js","_app/immutable/chunks/index.35a173b3.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = [];
export const fonts = [];
