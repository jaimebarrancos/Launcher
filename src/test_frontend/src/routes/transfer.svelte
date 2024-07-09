<script>
  //parsing
  import { Principal } from "@dfinity/principal";
  import { createAgent } from "@dfinity/utils";
  import { onMount } from "svelte";

  //canisters
  import { LedgerCanister } from "@dfinity/ledger-icp";
  import { authClient, hasPaid } from "./stores/ledger";

  export async function onClick() {
    
    const identity = await $authClient.getIdentity();
    const agent = await createAgent({
      identity,
      host: "http://localhost:8080",
    });

    const ledgerCanister = LedgerCanister.create({
      agent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    });
    agent.fetchRootKey();

    const balance = await ledgerCanister.accountBalance({
      accountIdentifier:
        "163dab6d525780f9907845558b5771a031aaa60129d1f9db7d45d4b5e989e5b6",
    });
    console.log("balance", balance);

    try {
      await ledgerCanister.icrc2Approve({
        spender: {
          owner: Principal.fromText("g6z42-4eaaa-aaaaa-qaata-cai"),
          subaccount: [],
        },
        amount: 5,
      });
      hasPaid.set(true);

    } catch (error) {
      console.error("error", error);
    }
    console.log("success");
  }
</script>

<div>
  <button
    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    on:click={onClick}
    >Enter
  </button>
</div>
