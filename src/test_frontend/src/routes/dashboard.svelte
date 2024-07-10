<script>
  import { authClient, youCanisterId } from "./stores/ledger";
  import { idlFactory } from "$lib/youIdl.did.js";
  import { createAgent } from "@dfinity/utils";
  import { Actor } from "@dfinity/agent";

  // variables
  var userInput = "";

  async function onClick() {
    console.log("userInput", userInput);

    console.log("youCanisterId", $youCanisterId);
    const identity = await $authClient.getIdentity();
    const agent = await createAgent({
      identity,
      host: "https://icp0.io", // https://ic0.app
    });

    agent.fetchRootKey();
    const youCanister = Actor.createActor(idlFactory, {
      agent,
      canisterId: $youCanisterId,
    });

    let result = await youCanister.reboot_user_dailyCheck(userInput);
  }


</script>

<div class="flex-1">
  <div class="flex flex-col items-start gap-2">
    <label
      class="block text-gray-700 text-sm font-bold mb-2"
      for="unique-input"
    >
      Write your daily thoughts
    </label>
    <div
      class="w-full max-w-xl p-5 rounded-lg font-mono flex items-center gap-4"
    >
      <input
        class="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
        placeholder="Enter text here"
        type="text"
        id="unique-input"
        bind:value={userInput}
      />
      <button
        on:click={onClick}
        class="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
      >
        Share
      </button>
    </div>
  </div>
  <div class="mt-4">canister Id {$youCanisterId}</div>
  <div class="mt-4">{$authClient.getIdentity().getPrincipal().toText()}
  </div>
  <div class="mt-4"></div>

  <div
    class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-10rem)]"
    aria-hidden="true"
  >
    <div
      class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9fff32] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
    ></div>
  </div>
  <a
    href="https://q3gy3-sqaaa-aaaas-aaajq-cai.raw.icp0.io/"
    class="text-sm font-semibold leading-6 text-gray-900 bg-transparent"
    target="_blank">Dashboard</a
  >
</div>
