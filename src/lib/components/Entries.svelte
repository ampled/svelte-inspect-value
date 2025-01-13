<script lang="ts">
  import { useOptions } from '../options.svelte.js'
  import type { ValueType } from '../util.js'

  type Props = {
    length?: number
    type?: ValueType | string
  }

  let { length, type }: Props = $props()

  const options = useOptions()

  let unit = $derived.by(() => {
    if (!options.value.showLength) {
      return ''
    }
    if (!type) return ''
    switch (type) {
      case 'array':
      case 'int8array':
      case 'uint8array':
      case 'uint8clampedarray':
      case 'int16array':
      case 'uint16array':
      case 'int32array':
      case 'uint32array':
      case 'float32array':
      case 'float64array':
      case 'bigint64array':
      case 'biguint64array':
        return 'items'
      case 'string':
        return 'chars'
      default:
        return 'entries'
    }
  })
</script>

{#if options.value.showLength && typeof length === 'number'}
  <span class="length">
    {#if length > 0}
      {length} {unit}
    {:else}
      empty
    {/if}
  </span>
{/if}

<style>
  .length {
    color: var(--comments);
    font-style: italic;
    font-size: 0.857em;
  }
</style>
