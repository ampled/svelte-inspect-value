<script lang="ts">
  import { getContext } from 'svelte'

  import type { HTMLAttributes } from 'svelte/elements'
  import { useOptions } from '../options.svelte.js'
  import type { ValueType } from '../util.js'

  type Props = {
    type?: ValueType | 'noop' | string
    force?: boolean
  } & HTMLAttributes<HTMLSpanElement>

  let { type = '', force, ...rest }: Props = $props()

  const options = useOptions()

  let display = $derived.by(() => {
    switch (type) {
      case 'number':
        return 'num'
      case 'string':
        return 'str'
      case 'function':
        return 'fn'
      case 'asyncfunction':
        return 'async'
      case 'generatorfunction':
        return 'gen'
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
        return 'obj'
      case 'array':
        return 'arr'
      case 'promise':
        return 'Promise'
      case 'null':
        return 'NULL'
      default:
        return type
    }
  })

  const ALWAYS_VISIBLE_TYPES = [
    'undefined',
    'null',
    'class',
    'function',
    'promise',
    'Entry',
    'map',
    'set',
    'date',
    'url',
  ]

  let required = $derived(ALWAYS_VISIBLE_TYPES.includes(type))

  const previewLevel = getContext<number | undefined>('preview')
</script>

{#if (type && options.value.showTypes && !previewLevel) || required || force}
  <span class={`type ${type}`} title={type} {...rest}>
    {display}
  </span>
{/if}

<style>
  .type {
    font-weight: 900;
  }
</style>
