<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { stringify } from '$lib/util.js'
  import JsonViewer from './JsonViewer.svelte'
  import StringValue from './StringValue.svelte'
  import StringView from './StringView.svelte'
  import TitleBar from './TitleBar.svelte'

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

<TitleBar {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <span class="value date">{stringify(value)}</span>
  {/snippet}
  {#each entries as [key, value], i (key)}
    <div class="entry" style="--index: {i}">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</TitleBar>

<StringView value={stringify(value).replaceAll('"', '')} {key} {type} />
