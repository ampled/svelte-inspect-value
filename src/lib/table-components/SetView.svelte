<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<Set<any>>

  let { value = new Set(), key = undefined, type, path }: Props = $props()

  let entries = $derived(Array.from(value.entries()))
</script>

<TitleBar {...{ value, key, type, path }} length={entries.length}>
  {#each entries as [key, value], i (i)}
    <div class="entry" style="--index: {i}">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</TitleBar>
