<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { createQuery } from '@tanstack/svelte-query'
  import { derived, writable } from 'svelte/store'

  let showInspect = $state(true)

  let pokeName = writable('squirtle')

  let pokeQuery = createQuery(
    derived(pokeName, ($pName) => ({
      queryKey: ['pokemon', $pName],
      queryFn: async () => {
        try {
          const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${$pName}`)
          if (request.ok) {
            let pokemon = await request.json()
            return pokemon
          } else {
            let err = await request.text()
            throw err
          }
        } catch (e) {
          return e
        }
      },
      retry: false,
    }))
  )
</script>

<button onclick={() => (showInspect = !showInspect)}>toggle</button>

<div style="padding: 2em">
  {#if showInspect}
    <Inspect value={$pokeQuery} />

    <Inspect
      value={$pokeQuery.isSuccess ? $pokeQuery.data : $pokeQuery.isError ? $pokeQuery.error : ''}
    />
  {/if}
</div>

<input type="text" bind:value={$pokeName} />
