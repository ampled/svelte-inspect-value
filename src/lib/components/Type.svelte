<script lang="ts">
  import { getContext } from 'svelte'

  import { OPTIONS_CONTEXT, type OptionsContext } from '$lib/options.svelte.js'
  import type { ValueType } from '$lib/util.js'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    type?: ValueType | 'noop' | string
  } & HTMLAttributes<HTMLSpanElement>

  let { type = '', ...rest }: Props = $props()

  const options: OptionsContext = getContext(OPTIONS_CONTEXT)

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
      case 'null':
        return 'NULL'
      default:
        return type
    }
  })

  const ALWAYS_VISIBLE_TYPES = ['undefined', 'null', 'class', 'function', 'promise', 'MapEntry']

  let required = $derived(ALWAYS_VISIBLE_TYPES.includes(type))
</script>

{#if (type && showTypes) || required}
  <span class={`type ${type}`} {...rest} title={type}>
    {display}
  </span>
{/if}
