<script>
  //svelte
  import { authClient, hasPaid, name, youCanisterId } from "./stores/ledger";

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
    let principal = identity.getPrincipal().toText();
    console.log("principalidentity", principal);
    
    const agent = await createAgent({
      identity,
      host: "https://icp0.io",
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
          owner: Principal.fromText("35tmg-oiaaa-aaaan-qmpwa-cai"),
          subaccount: [],
        },
        amount: 10_000_000,
      });

    } catch (error) {
      console.error("error", error);
    }

    let result = await deployerCanister.reboot_launcher_deployYou($name);
    console.log("result", result);
    // const balance = await ledgerCanister.accountBalance({
    //   accountIdentifier:
    //     "163dab6d525780f9907845558b5771a031aaa60129d1f9db7d45d4b5e989e5b6",
    // });
    // console.log("balance", balance);

    console.log("result2", result.ok._arr);

    const newCanisterId = Principal.fromUint8Array(result.ok._arr);
    console.log("Canister Id", newCanisterId.toText());
    youCanisterId.set(newCanisterId.toText());
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
