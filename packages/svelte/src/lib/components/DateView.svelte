<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import StringValue from './StringValue.svelte'

  type Props = TypeViewProps<Date>

  let { value, key, type, path, ...rest }: Props = $props()

  // TODO: move to shared lib
  const keys = [
    'toString',
    'toLocaleString',
    'toLocaleDateString',
    'toLocaleTimeString',
    'toDateString',
    'toTimeString',
    'toISOString',
    'toUTCString',
    'toGMTString',
    'getDate',
    'getDay',
    'getFullYear',
    'getHours',
    'getMilliseconds',
    'getMinutes',
    'getMonth',
    'getSeconds',
    'getTime',
    'getTimezoneOffset',
    'getUTCDate',
    'getUTCDay',
    'getUTCFullYear',
    'getUTCHours',
    'getUTCMilliseconds',
    'getUTCMinutes',
    'getUTCMonth',
    'getUTCSeconds',
    'getYear',
  ] as unknown as (keyof Date)[]

  let entries = $derived.by(() => {
    let res = keys.map((k) => [k, (value[k] as unknown as Function)()])

    if (Object.hasOwn(globalThis, 'Temporal')) {
      res.push(['toTemporalInstant', value.toTemporalInstant()])
    }

    return res
  })
</script>

<Expandable
  {...{ value, key, type, path }}
  length={entries.length}
  keepPreviewOnExpand
  showLength={false}
  {...rest}
>
  {#snippet valuePreview({ showPreview })}
    {#if showPreview}
      <StringValue {type} value={value.toUTCString()} />
    {/if}
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node
        {value}
        {key}
        {path}
        keyStyle="--_text-color: var(--_function-name-color); padding-right: 1ch; gap: 0;"
        keyDelim="=>"
        keyPostfix="()"
      />
    </Entry>
  {/each}
</Expandable>
