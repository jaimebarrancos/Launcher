<script>
  //svelte
  import { onMount } from "svelte";

  //authenticating
  import { Actor, HttpAgent } from "@dfinity/agent";
  import { principal, authClient, initAuthClient, hasPaid } from './stores/ledger';

  import { deployer } from "$lib/canisters";


  onMount(async () => {
    await initAuthClient();
    hasPaid.set(false);
  });

  async function updateIdentity() {
    const principalId = $authClient.getIdentity().getPrincipal().toText();

    Actor.agentOf(deployer).replaceIdentity(client.getIdentity());

    principal.set(principalId);
  }

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
        onSuccess: updateIdentity,
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

  function showPrincipal() {
    principal.set($authClient.getIdentity().getPrincipal().toText());
    console.log($principal)
  }
</script>

<main>
  <div class="lg:flex lg:flex-1 lg:justify-end">
    <button id="login" href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></button>
</div>
  <button on:click={showPrincipal}>set Principal</button>

</main>
