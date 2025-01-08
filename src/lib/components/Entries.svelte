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
