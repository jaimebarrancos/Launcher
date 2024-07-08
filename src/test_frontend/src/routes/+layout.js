import { Buffer } from 'buffer/';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Polyfill Buffer for development purpose
globalThis.Buffer = Buffer;


export const prerender = true;
