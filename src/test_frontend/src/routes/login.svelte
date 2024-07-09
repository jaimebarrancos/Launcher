<script>
  //svelte
  import { onMount } from "svelte";

  //authenticating
  import { loggedIn, principal, authClient, initAuthClient, hasPaid } from "./stores/ledger";

  //functions
  onMount(async () => {
    await initAuthClient();
    hasPaid.set(false);
  });

  async function logInSuccess() {
    loggedIn.set(true);
    principal.set($authClient.getIdentity().getPrincipal().toText());
  }

  function displayPrincipalShort(principal) {
    if (principal.length > 10) {
      return `${principal.substring(0, 5)}...${principal.substring(principal.length - 5)}`;
    }
    return principal;
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
        onSuccess: logInSuccess,
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
</script>

<main>
  {#if $loggedIn}
    <div>{displayPrincipalShort($principal)}</div>
  {:else}
    <div class="lg:flex lg:flex-1 lg:justify-end">
      <button
        id="login"
        href="#"
        class="text-sm font-semibold leading-6 text-gray-900"
        >Log in <span aria-hidden="true">&rarr;</span></button
      >
    </div>
  {/if}
  <!-- <button on:click={showPrincipal}>set Principal</button> -->
</main>
