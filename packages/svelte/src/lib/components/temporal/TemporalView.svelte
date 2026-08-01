<script lang="ts" generics="V extends TemporalObject">
  import type { TemporalObject, TypeViewProps } from '../../types.js'
  import Entry from '../Entry.svelte'
  import Expandable from '../Expandable.svelte'
  import Node from '../Node.svelte'
  import StringValue from '../StringValue.svelte'

  type Props = TypeViewProps<V>

  let { value, key, type, path, ...rest }: Props = $props()

  let localeString = $derived.by(() => {
    try {
      return (value as any).toLocaleString()
    } catch {
      return undefined
    }
  })

  let keys = $derived(
    (Object.getOwnPropertyNames(Object.getPrototypeOf(value)) as (keyof V)[]).filter(
      (k) => !['constructor'].includes(k as string) && typeof value[k] !== 'function'
    )
  )

  let entries = $derived(
    ([...keys.map((key) => [key, value[key]])] as [PropertyKey, unknown][]).filter(
      (v) => v !== null
    )
  )

  let stringified = $derived(
    [['toString', value.toString()], localeString ? ['toLocaleString', localeString] : null].filter(
      (v) => v != null
    )
  )
</script>

<Expandable
  {...{ value, key, type, path }}
  length={keys.length}
  keepPreviewOnExpand
  showLength={false}
  {...rest}
>
  {#snippet valuePreview({ showPreview })}
    {#if showPreview}
      <StringValue {type} value={localeString ?? value.toString()} />
    {/if}
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} />
    </Entry>
  {/each}
  {#each stringified as [key, value], i (key)}
    <Entry {i}>
      <Node
        keyStyle="--_text-color: var(--_function-name-color); padding-right: 1ch; gap: 0;"
        keyPostfix="()"
        keyDelim="=>"
        {value}
        {key}
        {path}
      />
    </Entry>
  {/each}
</Expandable>
