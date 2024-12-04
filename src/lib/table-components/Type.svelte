<script lang="ts">
  import { getContext } from 'svelte'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { ValueType } from '$lib/util.js'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    type?: ValueType | 'noop'
  } & HTMLAttributes<HTMLSpanElement>

  let { type, ...rest }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { showTypes } = $derived(options.value)

  let display = $derived.by(() => {
    switch (type) {
      case 'boolean':
        return 'bool'
      case 'url':
        return 'URL'
      case 'urlsearchparams':
        return 'URLsearch'
      case 'map':
        return 'Map'
      case 'set':
        return 'Set'
      case 'date':
        return 'Date'
      default:
        return type
    }
  })
</script>

{#if showTypes || type === 'undefined' || type === 'null' || type === 'class' || type === 'function'}
  <small class={`type ${type}`} {...rest} title={type}>
    {display}
  </small>
{/if}
