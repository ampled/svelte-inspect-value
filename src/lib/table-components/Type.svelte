<script lang="ts">
  import { getContext } from 'svelte'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { VType } from '$lib/util.js'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    type?: VType | 'noop'
  } & HTMLAttributes<HTMLSpanElement>

  let { type, ...rest }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { showTypes } = $derived(options.value)
</script>

{#if showTypes || type === 'undefined' || type === 'null' || type === 'class' || type === 'function'}
  <small class={`type ${type}`} {...rest}>
    {type}
  </small>
{/if}
