<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { getPreviewLevel } from '../contexts.js'
  import { useOptions } from '../options.svelte.js'
  import type { ValueType } from '../util.js'
  import Highlight from './Highlight.svelte'

  type Props = {
    type?: ValueType | 'noop' | string
    force?: boolean
  } & HTMLAttributes<HTMLSpanElement>

  let { type = '', force, ...rest }: Props = $props()

  const options = useOptions()

  // TODO: move to core lib
  let display = $derived.by(() => {
    switch (type) {
      case 'Undefined':
        return 'undefined'
      case 'Null':
        return 'null'
      case 'Number':
        return 'num'
      case 'String':
        return 'str'
      case 'Symbol':
        return 'symbol'
      case 'Boolean':
        return 'bool'
      case 'BigInt':
        return 'bigint'
      case 'Object':
        return 'obj'
      case 'Array':
        return 'arr'
      case 'RegExp':
        return 'regex'
      case 'Function':
        return 'fn'
      case 'AsyncFunction':
        return 'async fn'
      case 'GeneratorFunction':
        return 'fn*'
      case 'AsyncGeneratorFunction':
        return 'async fn*'
      case 'Temporal.PlainDate':
      case 'Temporal.PlainTime':
      case 'Temporal.PlainDateTime':
      case 'Temporal.PlainMonthDay':
      case 'Temporal.PlainYearMonth':
      case 'Temporal.Instant':
      case 'Temporal.ZonedDateTime':
      case 'Temporal.ZonedDateTime':
      case 'Temporal.Duration':
        return type.split('.')[1]
      default:
        return type
    }
  })

  // TODO move to shared lib
  const ALWAYS_VISIBLE_TYPES = [
    'Undefined',
    'Null',
    'class',
    'Function',
    'AsyncFunction',
    'GeneratorFunction',
    'AsyncGeneratorFunction',
    'Promise',
    'readable',
    'writable',
    'Entry',
    'Map',
    'Set',
    'Date',
    'URL',
    'Error',
    'Temporal.PlainDate',
    'Temporal.PlainTime',
    'Temporal.PlainDateTime',
    'Temporal.PlainMonthDay',
    'Temporal.PlainYearMonth',
    'Temporal.Instant',
    'Temporal.ZonedDateTime',
    'Temporal.ZonedDateTime',
    'Temporal.Duration',
  ]

  let required = $derived(ALWAYS_VISIBLE_TYPES.includes(type))

  const previewLevel = getPreviewLevel()
</script>

{#if (type && options.value.showTypes && previewLevel === 0) || required || force}
  <Highlight
    value={display}
    fields={['type']}
    alsoMatch={type}
    data-testid="type"
    class={['type', type.toLowerCase(), previewLevel ?? 'preview']}
    title={type}
    {...rest}
  />
{/if}
