<script>
  //components
  import Navbar from "./navbar.svelte";
  import Transfer from "./transfer.svelte";
  import Dashboard from "./dashboard.svelte";

  //svelte
  import { fade } from "svelte/transition";

  //stores
  import { hasPaid, name , youCanisterId} from "./stores/ledger";

  var inputCanister = false;

  async function onClick() {
    hasPaid.set(true);
  }
</script>

<main>
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
      <Navbar />
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#9fff32] to-[#9fff32] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        ></div>
      </div>

      {#if !$hasPaid}
        <div
          class="relative isolate px-6 pt-14 lg:px-8"
          out:fade={{ duration: 600 }}
        >
          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="text-center">
              <h1
                class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Launcher
              </h1>
              <p
                class="mt-6 text-lg leading-8 text-gray-600 flex justify-center items-center"
              >
                Welcome to the future <input
                  type="text"
                  placeholder="Alexander"
                  bind:value={$name}
                  style="text-align: center;"
                  class="ml-2 w-32 bg-transparent border-b-2 border-gray-500 outline-none placeholder-gray-200"
                />
              </p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                {#if !inputCanister}
                  <Transfer />

                  <button
                    on:click={() => (inputCanister = true)}
                    class="text-sm font-semibold leading-6 text-gray-900"
                    >Already created your avatar <span aria-hidden="true"
                      >→</span
                    ></button
                  >
                {:else}
                  <div class="flex items-center justify-center">
                    <div class="relative">
                      <input
                        bind:value={$youCanisterId}
                        id="inputCanisterId"
                        name="inputCanisterId"
                        type="text"
                        class="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                      />
                      <label
                        for="inputCanisterId"
                        class="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                        >Canister Id</label
                      >
                    </div>
                  </div>
                  <button
                  class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                  on:click={onClick}
                >
                  Continue
                </button>
                {/if}
              </div>
            </div>
          </div>
          <div>--- {$youCanisterId}---</div>
        </div>
      {:else}
        <div in:fade={{ duration: 1200 }}>
          <Dashboard />
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
      {/if}

      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9fff32] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        ></div>
      </div>
    </div>
  </div>
</main>

<style>
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
</style>
