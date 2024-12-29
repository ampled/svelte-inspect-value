<script lang="ts">
  import { OPTIONS_CONTEXT, type OptionsContext } from '$lib/options.svelte.js'
  import type { ValueType } from '$lib/util.js'
  import { getContext } from 'svelte'

  type Props = {
    length?: number
    type?: ValueType | string
  }

  let { length, type }: Props = $props()

  const options: OptionsContext = getContext(OPTIONS_CONTEXT)

  let { showLength } = $derived(options.value)

  let unit = $derived.by(() => {
    if (!showLength) {
      return ''
    }
    if (!type) return ''
    switch (type) {
      case 'array':
        return 'items'
      case 'set':
      case 'map':
      case 'object':
        return 'entries'
      case 'string':
        return 'chars'
      default:
        return 'entries'
    }
  })

  //
</script>

{#if showLength && typeof length === 'number'}
  <span class="length">
    {#if length > 0}
      {length} {unit}
    {:else}
      empty
    {/if}
  </span>
{/if}
