<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './Node.svelte'
  import Expandable from './Expandable.svelte'
  import Entry from './Entry.svelte'
  import ArrayPreview from './ArrayPreview.svelte'

  type Props = TypeViewProps<unknown[]>

  let { value: arrayVal = [], key = undefined, type, path }: Props = $props()
</script>

<Expandable {...{ value: arrayVal, key, type, path }} length={arrayVal.length}>
  {#snippet val()}
    <ArrayPreview value={arrayVal} />
  {/snippet}
  {#each arrayVal as value, i (i)}
    <Entry {i}>
      <JsonViewer key={i} {value} {path} />
    </Entry>
  {/each}
</Expandable>
