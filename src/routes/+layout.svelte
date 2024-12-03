<script lang="ts">
  import TableJsonView from '$lib/Inspect.svelte'

  const { children } = $props()
</script>

<h1>Svelte Value Inspect</h1>

<main>
  <svelte:boundary>
    {#snippet failed(error, reset)}
      <TableJsonView value={error} />

      <button onclick={reset}>reset</button>
    {/snippet}

    {@render children()}
  </svelte:boundary>
</main>

<style>
  @import './app.css';
</style>
