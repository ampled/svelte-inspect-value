<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<Set<any>>

  let { value = new Set(), key = undefined, type }: Props = $props()

  let entries = $derived(Array.from(value.entries()))
  let collapsed = $state(false)
</script>

<TitleBar {key} {type} length={entries.length} bind:collapsed />
<div class="indent" class:collapsed>
  {#each entries as [key, value], i (i)}
    <div class="entry">
      <JsonViewer {value} {key} />
    </div>
  {/each}
</div>
