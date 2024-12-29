<script lang="ts">
  import './app.css'

  import TableJsonView from '$lib/Inspect.svelte'
  import { QueryClientProvider } from '@tanstack/svelte-query'

  const { children, data } = $props()
</script>

<a href="/">
  <h1>Svelte Value Inspect</h1>
</a>

<QueryClientProvider client={data.queryClient}>
  <main>
    <svelte:boundary>
      {#snippet failed(error, reset)}
        <TableJsonView value={error} />

        <button onclick={reset}>reset</button>
      {/snippet}

      {@render children()}
    </svelte:boundary>
  </main>
</QueryClientProvider>
