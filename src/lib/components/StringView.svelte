<script lang="ts">
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { collapseString, stringify } from '../util.js'
  import { isUrl as isurl } from '../util/is-url.js'
  import Expandable from './Expandable.svelte'
  import OneLineView from './OneLineView.svelte'
  import StringValue from './StringValue.svelte'

  let { value = '', key, type, path }: TypeViewProps<string> = $props()

  const options = useOptions()

  let isMultiLine = $derived(value.includes('\n'))

  let isUrl = $derived(isurl(value))
  let isImageUrl = $derived((isUrl && value.endsWith('.png')) || value.endsWith('.svg'))
  let iaAudioUrl = $derived(isUrl && value.endsWith('.ogg'))

  let display = $derived(collapseString(value, options.value.stringCollapse))
</script>

{#if isMultiLine || isImageUrl || iaAudioUrl}
  <Expandable {...{ value, key, type, path }} length={value.length} keepPreviewOnExpand>
    {#snippet val()}
      <StringValue {value} />
    {/snippet}
    {#if isImageUrl}
      <div class="embed">
        <img alt={key!.toString()} src={value} style="max-height: 100px" />
      </div>
    {:else if iaAudioUrl}
      <div class="embed">
        <audio controls src={value}></audio>
      </div>
    {:else}
      <pre class="value string multi" title={value}>{value}</pre>
    {/if}
  </Expandable>
{:else}
  <OneLineView {key} {type} {path} value={stringify(display)} title={stringify(value)}>
    {#snippet val()}
      <StringValue {value} length />
    {/snippet}
  </OneLineView>
{/if}

<style>
  .embed {
    margin-left: 1em;
  }
</style>
