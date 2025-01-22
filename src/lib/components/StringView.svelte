<!-- @component

TODO handle data: urls?
-->
<script lang="ts">
  import { getContext } from 'svelte'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { stringify } from '../util.js'
  import Expandable from './Expandable.svelte'
  import OneLineView from './OneLineView.svelte'
  import StringValue from './StringValue.svelte'

  let { value = '', key, type, path, showKey }: TypeViewProps<string> = $props()

  const previewLevel = getContext<number | undefined>('preview')
  const options = useOptions()

  let isMultiLine = $derived(value.includes('\n'))

  const IMAGE_EXTENSIONS = ['.png', '.svg', '.jpg', '.jpeg', '.webp']
  const AUDIO_EXTENSIONS = ['.mp3', '.ogg', '.wav']

  let isUrl = $derived(URL.canParse(value) || value.startsWith('/'))
  let isImageUrl = $derived(
    (IMAGE_EXTENSIONS.some((extension) => value.endsWith(extension)) && isUrl) ||
      value.startsWith('data:image')
  )
  let isAudioUrl = $derived(
    AUDIO_EXTENSIONS.some((extension) => value.endsWith(extension)) && isUrl
  )
</script>

{#if (isMultiLine || ((isImageUrl || isAudioUrl) && options.value.embedMedia)) && !previewLevel}
  <Expandable {...{ value, key, type, path }} length={value.length} {showKey} keepPreviewOnExpand>
    {#snippet valuePreview({ showPreview })}
      {#if showPreview}
        <StringValue {value} length={false} />
      {/if}
    {/snippet}
    {#if isImageUrl && options.value.embedMedia}
      <div class="embed">
        <img alt={key!.toString()} src={value} style="max-height: 100px" />
      </div>
    {:else if isAudioUrl && options.value.embedMedia}
      <div class="embed">
        <audio controls src={value}></audio>
      </div>
    {:else if isMultiLine}
      <pre class="value string multi" title={value}>{value}</pre>
    {/if}
  </Expandable>
{:else}
  <!-- OneLineView should be more performant in nested preview mode as it has less initial logic -->
  <OneLineView {showKey} {key} {type} {path} {value} title={stringify(value)}>
    <StringValue {value} length />
  </OneLineView>
{/if}

<style>
  .embed {
    margin-left: 1em;
  }
</style>
