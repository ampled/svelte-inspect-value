<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<Set<unknown>>

  let { value, key, type, path }: Props = $props()

  let entries = $derived([...value.entries()].map(([_, v]) => v))

  let preview = $derived(entries.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <Preview list={preview} hasMore={preview.length < entries.length} prefix={'['} postfix={']'} />
  {/snippet}
  {#each entries as value, i (i)}
    <Entry {i}>
      <Node {value} key={i} {path} />
    </Entry>
  {/each}
</Expandable>
