<script lang="ts">
  import type { TypeViewProps } from '../../types.js'
  import Entry from '../Entry.svelte'
  import Expandable from '../Expandable.svelte'
  import Node from '../Node.svelte'
  import StringValue from '../StringValue.svelte'

  type Props = TypeViewProps<Temporal.Instant, 'temporal.instant'>

  let { value, key, type, path, ...rest }: Props = $props()

  let entries = $derived.by(() => {
    const { epochMilliseconds, epochNanoseconds } = value
    return Object.entries({
      toString: value.toString(),
      toLocaleString: value.toLocaleString(),
      epochMilliseconds,
      epochNanoseconds,
    })
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
      <StringValue {type} value={value.toString()} />
    {/if}
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
