<script>
  import { authClient, youCanisterId } from "./stores/ledger";
  import {idlFactory} from "$lib/youIdl.did.js";
  import { createAgent } from "@dfinity/utils";
  import { Actor } from "@dfinity/agent";

  // variables
  var userInput = '';

  async function onClick() {
    console.log("userInput", userInput);

    console.log("youCanisterId", $youCanisterId);
    const identity = await $authClient.getIdentity();
    const agent = await createAgent({
      identity,
      host: "http://localhost:8080",
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
    <label class="block text-gray-700 text-sm font-bold mb-2" for="unique-input">
      Write your daily thoughts
    </label>
    <div class="w-full max-w-xl p-5 rounded-lg font-mono flex items-center gap-4">
      <input
        class="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
        placeholder="Enter text here"
        type="text"
        id="unique-input"
        bind:value={userInput}
      />
      <button on:click={onClick}
        class="cursor-pointer transition-all bg-gray-700 text-white px-6 py-2 rounded-lg border-green-400 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
      >
        Share
      </button>
    </div>
  </div>
</div>