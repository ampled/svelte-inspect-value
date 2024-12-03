<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlValue from './HTMLValue.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import OneLineView from './OneLineView.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<HTMLElement>

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

  // let collapsed = $state(true)
</script>

<!-- <TitleBar {key} {type} {path} length={properties.length} bind:collapsed />
  <div class="indent" class:collapsed>
    {#each entries as [key, value] (key)}
      <div class="entry">
        <JsonViewer {value} {key} {path} />
      </div>
    {/each}
  </div> -->

<OneLineView {key} {type}>
  {#snippet val()}
    <HtmlValue {value} />
  {/snippet}
</OneLineView>
