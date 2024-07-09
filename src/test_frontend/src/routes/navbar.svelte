<script>
  import Login from "./login.svelte";
  import { fade } from "svelte/transition";
  import { hasPaid } from "./stores/ledger";
</script>

{#if !$hasPaid}
  <div out:fade={{ duration: 600 }}>
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="lg:flex lg:gap-x-12">
        <a
          href="https://github.com/jaimebarrancos/Launcher"
          class="text-sm font-semibold leading-6 text-gray-900">Github</a
        >
      </div>
      <Login />
    </nav>
  </div>
{/if}
