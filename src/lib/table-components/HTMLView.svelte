<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlValue from './HTMLValue.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<HTMLElement>

  let { value = undefined, key = undefined, type, path }: Props = $props()

  let entries = $derived(
    value
      ? Object.entries({
          class: value.className.split(' '),
          data: Object.fromEntries(Object.entries(value.dataset)),
        })
      : []
  )
</script>

<TitleBar {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <HtmlValue {value} />
  {/snippet}
  {#each entries as [key, value] (key)}
    <div class="entry">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</TitleBar>

<!-- <OneLineView {key} {type}>
  {#snippet val()}
    <HtmlValue {value} />
  {/snippet}
  {#each entries as [key, value] (key)}
    <div class="entry">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</OneLineView> -->
