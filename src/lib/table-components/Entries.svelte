<script lang="ts">
  import type { OptionsContext } from '$lib/options.svelte.js'
  import { getContext } from 'svelte'

  type Props = {
    length: number
  }

  let { length }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { showLength } = $derived(options.value)
</script>

{#if showLength || length === 0}
  {#if length > 0}
    <small class="length">{length} entries</small>
  {:else}
    <small class="length">empty!</small>
  {/if}
{/if}
