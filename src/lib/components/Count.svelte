<script lang="ts">
  import { useOptions } from '../options.svelte.js'
  import type { ValueType } from '../util.js'

  type Props = {
    length?: number
    type?: ValueType | string
  }

  let { length, type }: Props = $props()

  const options = useOptions()

  let { showLength } = $derived(options.value)

  let prefix = $derived.by(() => {
    if (!showLength) {
      return ''
    }
    // if (!type) return ''
    switch (type) {
      case 'urlsearchparams':
        return 'size:'
      default:
        return ''
    }
  })

  let unit = $derived.by(() => {
    if (!showLength) {
      return ''
    }
    // if (!type) return ''
    switch (type) {
      case 'urlsearchparams':
        return
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

{#if showLength && typeof length === 'number'}
  <span data-testid="count" class="count">
    {#if length > 0}
      {#if prefix}
        <span class="unit">{prefix}</span>
      {/if}
      {length}
      {#if unit}
        <span class="unit">{unit}</span>
      {/if}
    {:else}
      empty
    {/if}
  </span>
{/if}

<style>
  .count {
    transition: color 250ms ease-in-out;
    color: var(--_length-color);
    font-style: italic;
    font-weight: bold;
    font-size: 0.857em;
  }

  .unit {
    display: var(--unit-display);
  }
</style>
