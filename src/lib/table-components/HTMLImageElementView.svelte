<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<HTMLImageElement>

  let { value = undefined, key = undefined, type, path }: Props = $props()

  let outer = $derived.by(() => {
    if (value) {
      let tag = value.innerHTML
        ? value.outerHTML.slice(0, value.outerHTML.indexOf(value.innerHTML))
        : value.outerHTML
      return tag
    }
    return ''
  })

  let collapsed = $state(true)
</script>

{#if value}
  <TitleBar {key} {path} {type} bind:collapsed length={1}>
    {#snippet val()}
      {#if collapsed}
        <span class="value {type}" title={outer}>{outer}</span>
      {/if}
    {/snippet}
  </TitleBar>

  {#if !collapsed}
    <div class="indent">
      <img alt={value.alt} src={value.src} />
    </div>
  {/if}
{/if}

<!-- <TitleBar {key} {type} {path} length={properties.length} bind:collapsed />
    <div class="indent" class:collapsed>
      {#each entries as [key, value] (key)}
        <div class="entry">
          <JsonViewer {value} {key} {path} />
        </div>
      {/each}
    </div> -->

<!-- <OneLineView {key} {type} value={outer} /> -->
