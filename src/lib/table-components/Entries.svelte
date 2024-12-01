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

{#if showLength}
  <small class="length">// {length} entries</small>
{/if}
