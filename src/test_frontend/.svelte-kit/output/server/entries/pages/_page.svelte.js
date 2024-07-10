import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, b as add_attribute } from "../../chunks/ssr.js";
import { Principal } from "@dfinity/principal";
import { w as writable } from "../../chunks/index.js";
import "@dfinity/auth-client";
import { createAgent } from "@dfinity/utils";
import { LedgerCanister } from "@dfinity/ledger-icp";
import { HttpAgent, Actor } from "@dfinity/agent";
const loggedIn = writable(false);
const principal = writable("");
const authClient = writable("");
const hasPaid = writable(false);
const name = writable("");
const youCanisterId = writable("");
function displayPrincipalShort(principal2) {
  if (principal2.length > 10) {
    return `${principal2.substring(0, 5)}...${principal2.substring(principal2.length - 5)}`;
  }
  return principal2;
}
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_authClient;
  let $loggedIn, $$unsubscribe_loggedIn;
  let $principal, $$unsubscribe_principal;
  $$unsubscribe_authClient = subscribe(authClient, (value) => value);
  $$unsubscribe_loggedIn = subscribe(loggedIn, (value) => $loggedIn = value);
  $$unsubscribe_principal = subscribe(principal, (value) => $principal = value);
  $$unsubscribe_authClient();
  $$unsubscribe_loggedIn();
  $$unsubscribe_principal();
  return `<main>${$loggedIn ? `<div>${escape(displayPrincipalShort($principal))}</div>` : `<div class="lg:flex lg:flex-1 lg:justify-end" data-svelte-h="svelte-14lvb6u"><button id="login" href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">→</span></button></div>`} </main>`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasPaid, $$unsubscribe_hasPaid;
  $$unsubscribe_hasPaid = subscribe(hasPaid, (value) => $hasPaid = value);
  $$unsubscribe_hasPaid();
  return `${!$hasPaid ? `<div><nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global"><div class="lg:flex lg:gap-x-12" data-svelte-h="svelte-1adl7hb"><a href="https://github.com/jaimebarrancos/Launcher" class="text-sm font-semibold leading-6 text-gray-900">Github</a></div> ${validate_component(Login, "Login").$$render($$result, {}, {}, {})}</nav></div>` : ``}`;
});
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
const Transfer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $name, $$unsubscribe_name;
  let $authClient, $$unsubscribe_authClient;
  $$unsubscribe_name = subscribe(name, (value) => $name = value);
  $$unsubscribe_authClient = subscribe(authClient, (value) => $authClient = value);
  async function onClick() {
    hasPaid.set(true);
    const identity = await $authClient.getIdentity();
    let principal2 = identity.getPrincipal().toText();
    console.log("principalidentity", principal2);
    const agent = await createAgent({ identity, host: "https://icp0.io" });
    agent.fetchRootKey();
    const ledgerCanister = LedgerCanister.create({
      agent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai"
    });
    const deployerCanister = Actor.createActor(idlFactory, { agent, canisterId });
    try {
      await ledgerCanister.icrc2Approve({
        spender: {
          owner: Principal.fromText("35tmg-oiaaa-aaaan-qmpwa-cai"),
          subaccount: []
        },
        amount: 1e7
      });
    } catch (error) {
      console.error("error", error);
    }
    let result = await deployerCanister.reboot_launcher_deployYou($name);
    console.log("result", result);
    console.log("result2", result.ok._arr);
    const newCanisterId = Principal.fromUint8Array(result.ok._arr);
    console.log("Canister Id", newCanisterId.toText());
    youCanisterId.set(newCanisterId.toText());
  }
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  $$unsubscribe_name();
  $$unsubscribe_authClient();
  return `<div><button class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700" data-svelte-h="svelte-wqib2x">Create - 2 ICP</button></div>`;
});
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $youCanisterId, $$unsubscribe_youCanisterId;
  let $authClient, $$unsubscribe_authClient;
  $$unsubscribe_youCanisterId = subscribe(youCanisterId, (value) => $youCanisterId = value);
  $$unsubscribe_authClient = subscribe(authClient, (value) => $authClient = value);
  var userInput = "";
  $$unsubscribe_youCanisterId();
  $$unsubscribe_authClient();
  return `<div class="flex-1"><div class="flex flex-col items-start gap-2"><label class="block text-gray-700 text-sm font-bold mb-2" for="unique-input" data-svelte-h="svelte-1p5qq2r">Write your daily thoughts</label> <div class="w-full max-w-xl p-5 rounded-lg font-mono flex items-center gap-4"><input class="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100" placeholder="Enter text here" type="text" id="unique-input"${add_attribute("value", userInput, 0)}> <button class="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none" data-svelte-h="svelte-1n347ra">Share</button></div></div> <div class="mt-4">canister Id ${escape($youCanisterId)}</div> <div class="mt-4">${escape($authClient.getIdentity().getPrincipal().toText())}</div> <div class="mt-4"></div> <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-10rem)]" aria-hidden="true" data-svelte-h="svelte-8hrzml"><div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9fff32] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div></div> <a href="https://q3gy3-sqaaa-aaaas-aaajq-cai.raw.icp0.io/" class="text-sm font-semibold leading-6 text-gray-900 bg-transparent" target="_blank" data-svelte-h="svelte-8njhkl">Dashboard</a></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '@import "tailwindcss/base";@import "tailwindcss/components";@import "tailwindcss/utilities";',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasPaid, $$unsubscribe_hasPaid;
  let $name, $$unsubscribe_name;
  let $youCanisterId, $$unsubscribe_youCanisterId;
  $$unsubscribe_hasPaid = subscribe(hasPaid, (value) => $hasPaid = value);
  $$unsubscribe_name = subscribe(name, (value) => $name = value);
  $$unsubscribe_youCanisterId = subscribe(youCanisterId, (value) => $youCanisterId = value);
  $$result.css.add(css);
  $$unsubscribe_hasPaid();
  $$unsubscribe_name();
  $$unsubscribe_youCanisterId();
  return `<main><div class="bg-white"><header class="absolute inset-x-0 top-0 z-50">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}</header> <div class="relative isolate px-6 pt-14 lg:px-8"><div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true" data-svelte-h="svelte-ghwbxl"><div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9fff32] to-[#9fff32] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div></div> ${!$hasPaid ? `<div class="relative isolate px-6 pt-14 lg:px-8"><div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"><div class="text-center"><h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" data-svelte-h="svelte-1elozwb">Launcher</h1> <p class="mt-6 text-lg leading-8 text-gray-600 flex justify-center items-center">Welcome to the future <input type="text" placeholder="Alexander" style="text-align: center;" class="ml-2 w-32 bg-transparent border-b-2 border-gray-500 outline-none placeholder-gray-200"${add_attribute("value", $name, 0)}></p> <div class="mt-10 flex items-center justify-center gap-x-6">${`${validate_component(Transfer, "Transfer").$$render($$result, {}, {}, {})} <button class="text-sm font-semibold leading-6 text-gray-900" data-svelte-h="svelte-afhyy9">Already created your avatar <span aria-hidden="true">→</span></button>`}</div></div></div> <div>--- ${escape($youCanisterId)}---</div></div>` : `<div>${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}</div>`} <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true" data-svelte-h="svelte-9jtjrb"><div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9fff32] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div></div></div></div> </main>`;
});
export {
  Page as default
};
