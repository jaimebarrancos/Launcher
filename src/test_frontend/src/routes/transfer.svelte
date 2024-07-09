<script>
  //svelte
  import { authClient, hasPaid, name } from "./stores/ledger";

  //parsing
  import { Principal } from "@dfinity/principal";
  import { createAgent } from "@dfinity/utils";

  //canisters
  import { LedgerCanister } from "@dfinity/ledger-icp";
  import { Actor } from "@dfinity/agent";
  import { idlFactory, canisterId } from "declarations/deployer";

  export async function onClick() {
    hasPaid.set(true);

    const identity = await $authClient.getIdentity();
    console.log("principalidentity", identity.getPrincipal().toText());

    const agent = await createAgent({
      identity,
      host: "http://localhost:8080",
    });

    agent.fetchRootKey();
    const ledgerCanister = LedgerCanister.create({
      agent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    });

    const deployerCanister = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });

    try {
      await ledgerCanister.icrc2Approve({
        spender: {
          owner: Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai"),
          subaccount: [],
        },
        amount: 1_000_000_000,
      });

      //deploy canister
      let result = await deployerCanister.reboot_launcher_deployYou($name);
      console.log("result", result);

    } catch (error) {
      console.error("error", error);
    }
    const balance = await ledgerCanister.accountBalance({
      accountIdentifier:
        "163dab6d525780f9907845558b5771a031aaa60129d1f9db7d45d4b5e989e5b6",
    });
    console.log("balance", balance);
  }
</script>

<div>

  <button
    class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
    on:click={onClick}
  >
    Create - 2 ICP
  </button>

</div>
