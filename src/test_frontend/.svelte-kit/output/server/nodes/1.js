

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a92c185b.js","_app/immutable/chunks/scheduler.a75471c3.js","_app/immutable/chunks/index.3025f2c4.js","_app/immutable/chunks/singletons.36f371df.js","_app/immutable/chunks/index.be95db26.js"];
export const stylesheets = [];
export const fonts = [];
