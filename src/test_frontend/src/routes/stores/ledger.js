import { writable } from "svelte/store";
import { AuthClient } from "@dfinity/auth-client";

export const principal = writable("");
export const authClient = writable("");
export const hasPaid = writable(false);

export async function initAuthClient() {
    const client = await AuthClient.create();
    authClient.set(client);
  }