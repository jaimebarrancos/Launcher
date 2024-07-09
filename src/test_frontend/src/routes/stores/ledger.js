import { writable } from "svelte/store";
import { AuthClient } from "@dfinity/auth-client";

export const loggedIn = writable(false);
export const principal = writable("");
export const authClient = writable("");
export const hasPaid = writable(false);
export const name = writable("");
export const youCanisterId = writable("");

export async function initAuthClient() {
    const client = await AuthClient.create();
    authClient.set(client);
  }