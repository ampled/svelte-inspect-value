<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import JsonViewer from './Node.svelte'
  import Expandable from './Expandable.svelte'

  type Props = TypeViewProps<Date>

  let { value = new Date(), key, type, path }: Props = $props()

  let entries = $derived(
    Object.entries({
      year: value.getFullYear(),
      month: value.getMonth(),
      date: value.getDate(),
      day: value.getDay(),
      hour: value.getHours(),
      minutes: value.getMinutes(),
      seconds: value.getSeconds(),
      milliseconds: value.getMilliseconds(),
      asString: value.toString(),
      dateString: value.toDateString(),
      utcString: value.toUTCString(),
    })
  )
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <span class="value date">{value.toUTCString()}</span>
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
