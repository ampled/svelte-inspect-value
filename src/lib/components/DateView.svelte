<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import StringValue from './StringValue.svelte'

  type Props = TypeViewProps<Date>

  let { value = new Date(), key, type, path }: Props = $props()

  let entries = $derived(
    Object.entries({
      toString: value.toString(),
      dateString: value.toDateString(),
      utcString: value.toUTCString(),
      year: value.getFullYear(),
      month: value.getMonth(),
      date: value.getDate(),
      day: value.getDay(),
      hour: value.getHours(),
      minutes: value.getMinutes(),
      seconds: value.getSeconds(),
      milliseconds: value.getMilliseconds(),
      time: value.getTime(),
    })
  )
</script>

<Expandable
  {...{ value, key, type, path }}
  length={entries.length}
  keepPreviewOnExpand
  showLength={false}
>
  {#snippet valuePreview({ showPreview })}
    {#if showPreview}
      <StringValue {type} value={value.toUTCString()} />
    {/if}
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
