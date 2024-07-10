import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.5353b7f5.js","_app/immutable/chunks/index.6831a90a.js","_app/immutable/chunks/scheduler.0f962ddd.js","_app/immutable/chunks/index.7e80be4e.js"];
export const stylesheets = [];
export const fonts = [];
