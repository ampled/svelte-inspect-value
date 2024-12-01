<script lang="ts">
  import { getContext } from 'svelte'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { VType } from '$lib/util.js'

  type Props = {
    type?: VType
  }

  let { type }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { showTypes } = $derived(options.value)
</script>

{#if showTypes || type === 'undefined' || type === 'null' || type === 'class'}
  <small class={`type ${type}`}>
    {type}
  </small>
{/if}
