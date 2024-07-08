<script>
    //svelte
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    
    //parsing
    import { Principal } from "@dfinity/principal";
    import { principalToSubAccount, createAgent } from "@dfinity/utils";

    //authenticating
    import { AuthClient } from "@dfinity/auth-client";
    import { Actor, HttpAgent } from "@dfinity/agent";

    //canisters
    import { LedgerCanister } from "@dfinity/ledger-icp";
    import { deployer } from "$lib/canisters";

    const greeting = writable("");
    const principal = writable("");
    const authClient = writable("");
    let clicked = false;

  async function onClick() {
    clicked = true;

    const identity = await ($authClient).getIdentity();
    const agent = await createAgent({
      identity,
      host: "http://localhost:8080",
    });

    const ledgerCanister = LedgerCanister.create({
      agent,
      canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    });
    agent.fetchRootKey();

    const balance = await ledgerCanister.accountBalance({ accountIdentifier: "163dab6d525780f9907845558b5771a031aaa60129d1f9db7d45d4b5e989e5b6"});
    console.log("balance", balance);

    try {
      await ledgerCanister.icrc2Approve({
        spender: {
          owner: Principal.fromText("g6z42-4eaaa-aaaaa-qaata-cai"),
          subaccount: [],
        },
        amount: 5,
      });
    } catch (error) {
      console.error("error", error);
    }
    console.log("success");
  }

  async function handleSuccess() {
    const client = $authClient;
    const principalId = client.getIdentity().getPrincipal().toText();

    document.getElementById("principalId").innerText =
      `Your PrincipalId: ${principalId}`;

    Actor.agentOf(deployer).replaceIdentity(client.getIdentity());

    principal.set(principalId);
  }

  onMount(async () => {
    const client = await AuthClient.create();
    authClient.set(client);
  });
  onMount(() => {
    const handleLoginClick = async (e) => {
      const client = $authClient;
      if (!client) throw new Error("AuthClient not initialized");

      const APP_NAME = "Launcher";
      const APP_LOGO = "https://nfid.one/icons/favicon-96x96.png";
      const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

      const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

      client.login({
        identityProvider,
        onSuccess: handleSuccess,
        windowOpenerFeatures: `
          left=${window.screen.width / 2 - 525 / 2},
          top=${window.screen.height / 2 - 705 / 2},
          toolbar=0,location=0,menubar=0,width=525,height=705
        `,
      });
    };

    document
      .getElementById("login")
      ?.addEventListener("click", handleLoginClick);
  });

  function showPrincipal(event) {
    event.preventDefault();
    deployer.reboot_amountOfPeople().then((num) => {
      greeting.set(num.toString() + "---" + $principal);
    });

    return false;
  }
</script>

<main>

    <button class="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600" id="test" on:click={onClick}>call ledger</button>

    <div>
        <button id="login">Log me in</button>
    </div>
    <div id="principalId"></div>
    <button on:click={showPrincipal}>Show Principal</button>

    <section>
        {$greeting}
    </section>
</main>
