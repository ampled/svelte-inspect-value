<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'

  type Props = TypeViewProps<Set<unknown>>

  let { value, key, type, path }: Props = $props()

  let entries = $derived(Array.from(value.entries()))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#each entries as [_, value], i (i)}
    <Entry {i}>
      <JsonViewer {value} key={i} {path} />
    </Entry>
  {/each}
</Expandable>
