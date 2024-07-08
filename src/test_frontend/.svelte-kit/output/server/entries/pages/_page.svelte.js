import { c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import "@dfinity/principal";
import "@dfinity/utils";
import "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import "@dfinity/ledger-icp";
import { b as building } from "../../chunks/environment.js";
const idlFactory$1 = ({ IDL }) => {
  const WriteError = IDL.Variant({
    "FailedToGetModule": IDL.Null,
    "FailedToCreateCanister": IDL.Null,
    "NotEnoughCycles": IDL.Null
  });
  const Result_1 = IDL.Variant({ "ok": IDL.Null, "err": WriteError });
  const Result = IDL.Variant({ "ok": IDL.Principal, "err": IDL.Text });
  return IDL.Service({
    "getPrincipal": IDL.Func([], [IDL.Text], []),
    "reboot_amountOfPeople": IDL.Func([], [IDL.Nat], []),
    "reboot_deployModule": IDL.Func([IDL.Text, IDL.Text], [Result_1], []),
    "reboot_deployYou": IDL.Func([IDL.Text], [Result], [])
  });
};
const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
const createActor = (canisterId2, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }
  {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }
  return Actor.createActor(idlFactory$1, {
    agent,
    canisterId: canisterId2,
    ...options.actorOptions
  });
};
createActor(canisterId);
function dummyActor() {
  return new Proxy({}, { get() {
    throw new Error("Canister invoked while building");
  } });
}
const buildingOrTesting = building || process.env.NODE_ENV === "test";
buildingOrTesting ? dummyActor() : createActor(canisterId);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_principal;
  let $$unsubscribe_authClient;
  let $greeting, $$unsubscribe_greeting;
  const greeting = writable("");
  $$unsubscribe_greeting = subscribe(greeting, (value) => $greeting = value);
  const principal = writable("");
  $$unsubscribe_principal = subscribe(principal, (value) => value);
  const authClient = writable("");
  $$unsubscribe_authClient = subscribe(authClient, (value) => value);
  const createActor2 = (canisterId2, options = {}) => {
    const agent = options.agent || new HttpAgent({ ...options.agentOptions });
    if (options.agent && options.agentOptions) {
      console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
    }
    {
      agent.fetchRootKey().catch((err) => {
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.error(err);
      });
    }
    return Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId2,
      ...options.actorOptions
    });
  };
  if ($$props.createActor === void 0 && $$bindings.createActor && createActor2 !== void 0)
    $$bindings.createActor(createActor2);
  $$unsubscribe_principal();
  $$unsubscribe_authClient();
  $$unsubscribe_greeting();
  return `<main><img src="/logo2.svg" alt="DFINITY logo"> <br> <br> <div><button id="test" data-svelte-h="svelte-dyl8ha">call ledger</button></div> <div data-svelte-h="svelte-lxbw5v"><button id="login">Log me in</button></div> <div id="principalId"></div> <button data-svelte-h="svelte-tk882g">Show Principal</button> <section>${escape($greeting)}</section></main>`;
});
export {
  Page as default
};
