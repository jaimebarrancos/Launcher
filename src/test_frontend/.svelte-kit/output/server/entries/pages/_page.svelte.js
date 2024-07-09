import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";
import { b as building } from "../../chunks/environment.js";
import { Principal } from "@dfinity/principal";
import { createAgent } from "@dfinity/utils";
import { LedgerCanister } from "@dfinity/ledger-icp";
const principal = writable("");
const authClient = writable("");
const hasPaid = writable(false);
const idlFactory = ({ IDL }) => {
  const WriteError = IDL.Variant({
    "FailedToGetModule": IDL.Null,
    "FailedToCreateCanister": IDL.Null,
    "NotEnoughCycles": IDL.Null
  });
  const Result_1 = IDL.Variant({ "ok": IDL.Null, "err": WriteError });
  const Result = IDL.Variant({ "ok": IDL.Principal, "err": IDL.Text });
  return IDL.Service({
    "getPrincipal": IDL.Func([], [IDL.Text], []),
    "reboot_launcher_amountOfPeople": IDL.Func([], [IDL.Nat], []),
    "reboot_launcher_deployModule": IDL.Func(
      [IDL.Text, IDL.Text],
      [Result_1],
      []
    ),
    "reboot_launcher_deployYou": IDL.Func([IDL.Text], [Result], [])
  });
};
const canisterId = "35tmg-oiaaa-aaaan-qmpwa-cai";
const createActor = (canisterId2, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });
  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }
  return Actor.createActor(idlFactory, {
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
console.log("canisterID", canisterId);
buildingOrTesting ? dummyActor() : createActor(canisterId);
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_principal;
  let $$unsubscribe_authClient;
  $$unsubscribe_principal = subscribe(principal, (value) => value);
  $$unsubscribe_authClient = subscribe(authClient, (value) => value);
  $$unsubscribe_principal();
  $$unsubscribe_authClient();
  return `<main><div class="lg:flex lg:flex-1 lg:justify-end" data-svelte-h="svelte-1tmezk8"><button id="login" href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">→</span></button></div> <button data-svelte-h="svelte-1mwtrgz">set Principal</button></main>`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasPaid, $$unsubscribe_hasPaid;
  $$unsubscribe_hasPaid = subscribe(hasPaid, (value) => $hasPaid = value);
  $$unsubscribe_hasPaid();
  return `${!$hasPaid ? `<div><nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global"><div class="lg:flex lg:gap-x-12" data-svelte-h="svelte-1adl7hb"><a href="https://github.com/jaimebarrancos/Launcher" class="text-sm font-semibold leading-6 text-gray-900">Github</a></div> ${validate_component(Login, "Login").$$render($$result, {}, {}, {})}</nav></div>` : ``}`;
});
const Transfer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authClient, $$unsubscribe_authClient;
  $$unsubscribe_authClient = subscribe(authClient, (value) => $authClient = value);
  async function onClick() {
    const identity = await $authClient.getIdentity();
    console.log("principalidentity", identity.getPrincipal().toText());
    const agent = await createAgent({ identity, host: "http://localhost:8080" });
    agent.fetchRootKey();
    const ledgerCanister = LedgerCanister.create({
      agent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai"
    });
    const deployerCanister = Actor.createActor(idlFactory, { agent, canisterId });
    try {
      await ledgerCanister.icrc2Approve({
        spender: {
          owner: Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai"),
          subaccount: []
        },
        amount: 1e9
      });
      let result = await deployerCanister.reboot_launcher_deployYou("Jaime");
      console.log("result", result);
      hasPaid.set(true);
    } catch (error) {
      console.error("error", error);
    }
    const balance = await ledgerCanister.accountBalance({
      accountIdentifier: "163dab6d525780f9907845558b5771a031aaa60129d1f9db7d45d4b5e989e5b6"
    });
    console.log("balance", balance);
  }
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  $$unsubscribe_authClient();
  return `<div><button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" data-svelte-h="svelte-ubr06v">Enter</button></div>`;
});
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main data-svelte-h="svelte-4cfrls"><div class="w-full max-w-xs p-5 rounded-lg font-mono"><label class="block text-gray-700 text-sm font-bold mb-2" for="unique-input">Write your daily toughts</label> <input class="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100" placeholder="Enter text here" type="text" id="unique-input"></div></main>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '@import "tailwindcss/base";@import "tailwindcss/components";@import "tailwindcss/utilities";',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasPaid, $$unsubscribe_hasPaid;
  $$unsubscribe_hasPaid = subscribe(hasPaid, (value) => $hasPaid = value);
  $$result.css.add(css);
  $$unsubscribe_hasPaid();
  return `<main><div class="bg-white"><header class="absolute inset-x-0 top-0 z-50">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}</header> <div class="relative isolate px-6 pt-14 lg:px-8"><div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true" data-svelte-h="svelte-ghwbxl"><div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9fff32] to-[#9fff32] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div></div> ${!$hasPaid ? `<div class="relative isolate px-6 pt-14 lg:px-8"><div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"><div class="text-center"><h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" data-svelte-h="svelte-1elozwb">Launcher</h1> <p class="mt-6 text-lg leading-8 text-gray-600" data-svelte-h="svelte-2ufbvb">Enter the future.</p> <p></p> <div class="mt-10 flex items-center justify-center gap-x-6">${validate_component(Transfer, "Transfer").$$render($$result, {}, {}, {})} </div></div></div></div>` : `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})} <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-10rem)]" aria-hidden="true" data-svelte-h="svelte-1yp3cbh"><div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9fff32] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div></div> <a href="https://q3gy3-sqaaa-aaaas-aaajq-cai.raw.icp0.io/" class="text-sm font-semibold leading-6 text-gray-900 bg-transparent" target="_blank" data-svelte-h="svelte-1jp7qcf">Dashboard</a>`} <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true" data-svelte-h="svelte-9jtjrb"><div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9fff32] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div></div></div></div> </main>`;
});
export {
  Page as default
};
