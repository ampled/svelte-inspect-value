<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlValue from './HTMLValue.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import OneLineView from './OneLineView.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<HTMLElement>

  let { value = undefined, key = undefined, type, path }: Props = $props()
</script>

<OneLineView {key} {type}>
  {#snippet val()}
    <HtmlValue {value} />
  {/snippet}
</OneLineView>
