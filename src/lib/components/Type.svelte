<script lang="ts">
  import { getContext } from 'svelte'

  import type { OptionsContext } from '$lib/options.svelte.js'
  import type { ValueType } from '$lib/util.js'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    type?: ValueType | 'noop' | string
  } & HTMLAttributes<HTMLSpanElement>

  let { type, ...rest }: Props = $props()

  const options: OptionsContext = getContext('json-inspect')

  let { showTypes } = $derived(options.value)

  let display = $derived.by(() => {
    switch (type) {
      case 'number':
        return 'num'
      case 'function':
        return 'fn'
      case 'boolean':
        return 'bool'
      case 'url':
        return 'URL'
      case 'urlsearchparams':
        return 'URLSearch'
      case 'map':
        return 'Map'
      case 'set':
        return 'Set'
      case 'date':
        return 'Date'
      case 'object':
        return '{obj}'
      case 'array':
        return '[arr]'
      case 'promise':
        return 'Promise'
      case 'setiterator':
        return 'SetIterator'
      case 'null':
        return 'NULL'
      default:
        return type
    }
  })
</script>

{#if (type && showTypes) || type === 'undefined' || type === 'null' || type === 'class' || type === 'function' || type === 'promise' || type === 'MapEntry'}
  <small class={`type ${type}`} {...rest} title={type}>
    {display}
  </small>
{/if}
