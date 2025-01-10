<script lang="ts">
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { collapseString, stringify } from '../util.js'
  import Expandable from './Expandable.svelte'
  import OneLineView from './OneLineView.svelte'
  import StringValue from './StringValue.svelte'

  let { value = '', key, type, path }: TypeViewProps<string> = $props()

  const options = useOptions()

  let isMultiLine = $derived(value.includes('\n'))

  const IMAGE_EXTENSIONS = ['.png', '.svg', '.jpg', '.jpeg', '.webp']
  const AUDIO_EXTENSIONS = ['.mp3', '.ogg', '.wav']

  let isImageUrl = $derived(IMAGE_EXTENSIONS.some((extension) => value.endsWith(extension)))
  let isAudioUrl = $derived(AUDIO_EXTENSIONS.some((extension) => value.endsWith(extension)))

  let display = $derived(collapseString(value, options.value.stringCollapse))
</script>

{#if isMultiLine || isImageUrl || isAudioUrl}
  <Expandable {...{ value, key, type, path }} length={value.length} keepPreviewOnExpand>
    {#snippet valuePreview()}
      <StringValue {value} />
    {/snippet}
    {#if isImageUrl && options.value.embedMedia}
      <div class="embed">
        <img alt={key!.toString()} src={value} style="max-height: 100px" />
      </div>
    {:else if isAudioUrl && options.value.embedMedia}
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
