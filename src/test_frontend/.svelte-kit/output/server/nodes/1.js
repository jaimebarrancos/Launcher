

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.8d64e952.js","_app/immutable/chunks/scheduler.63274e7e.js","_app/immutable/chunks/index.e159bb4a.js","_app/immutable/chunks/singletons.84058b3c.js","_app/immutable/chunks/index.35a173b3.js"];
export const stylesheets = [];
export const fonts = [];
