<script lang="ts">
  import type { ValueType } from '../util.js'
  import Highlight from './Highlight.svelte'

  type Props = {
    length: number
    type?: ValueType | string
  }

  let { length, type }: Props = $props()

  let prefix = $derived.by(() => {
    switch (type) {
      case 'urlsearchparams':
        return 'size:'
      default:
        return ''
    }
  })

  // TODO: move to core lib
  let unit = $derived.by(() => {
    switch (type) {
      case undefined:
        return
      case 'URLSearchParams':
        return
      case 'Array':
      case 'Int8Array':
      case 'Uint8Array':
      case 'Uint8ClampedArray':
      case 'Int16Array':
      case 'Uint16Array':
      case 'Int32array':
      case 'Uint32Array':
      case 'Float32Array':
      case 'Float64Array':
      case 'BigInt64Array':
      case 'BigInt64Array':
        return 'items'
      case 'String':
        return 'chars'
      default:
        return 'entries'
    }
  })
</script>

{#if typeof length === 'number'}
  <div data-testid="count" class="count">
    {#if length > 0}
      {#if prefix}
        <span class="unit">{prefix}</span>
      {/if}
      <span>
        {length}
      </span>
      {#if unit}
        <Highlight class="unit" value={unit} fields={['value']} />
      {/if}
    {:else}
      <Highlight value="empty" fields={['value']} />
    {/if}
  </div>
{/if}

<style>
  .count {
    display: flex;
    gap: 0.5ch;
    transition: color var(--__transition-duration) ease-in-out;
    margin-right: 1ch;
    color: var(--_length-color);
    font-style: italic;
    font-weight: bold;
    font-size: 0.857em;
  }

  :global(.count .unit) {
    display: var(--unit-display);
  }
</style>
