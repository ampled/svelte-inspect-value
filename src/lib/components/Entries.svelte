<script lang="ts">
  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { ValueType } from '$lib/util.js'
  import { getContext } from 'svelte'

  type Props = {
    length?: number
    type?: ValueType | string
  }

  let { length, type }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

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
  {#if length > 0}
    <small class="length">{length} {unit}</small>
  {:else}
    <small class="length">empty!</small>
  {/if}
{/if}
