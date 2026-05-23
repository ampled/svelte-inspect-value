<script lang="ts">
  import type { TypeViewProps } from '../../types.js'
  import Entry from '../Entry.svelte'
  import Expandable from '../Expandable.svelte'
  import Node from '../Node.svelte'
  import StringValue from '../StringValue.svelte'

  type Props = TypeViewProps<Temporal.PlainDate, 'temporal.plaindate'>

  let { value, key, type, path, ...rest }: Props = $props()

  let keys = $derived(
    (
      Object.getOwnPropertyNames(Object.getPrototypeOf(value)) as (keyof Temporal.PlainDate)[]
    ).filter((k) => !['constructor'].includes(k as string) && typeof value[k] !== 'function')
  )

  let entries = $derived(
    Object.entries({
      toString: value.toString(),
      toLocaleString: value.toLocaleString(),
      toJson: value.toJSON(),
      year: value.year,
      month: value.month,
      day: value.day,
    })
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
      <StringValue {type} value={value.toString()} />
    {/if}
  {/snippet}
  {#each keys as key, i (key)}
    <Entry {i}>
      <Node value={value[key]} {key} {path} />
    </Entry>
  {/each}
</Expandable>
