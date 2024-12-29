<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'

  type Props = TypeViewProps<MapIterator<unknown>>

  let { value, key = undefined, type, path }: Props = $props()

  let entries = $state([...value])

  // $inspect('iteratorkind:', Object.hasOwn(value, '[[Entries]]'))
  // $inspect(key, 'entries:', entries)
</script>

<!-- <MapView value={new Map([...value])} {type} {key} {path} /> -->

<!-- <ArrayView value={entries} {key} {type}   /> -->

<Expandable {value} {type} {key} {path} length={entries.length}>
  {#each entries as entry, i (i)}
    {@const isEntry = Array.isArray(entry)}
    {@const k = isEntry ? entry[0] : i}
    {@const val = isEntry ? entry[1] : entry}
    <Entry {i}>
      <Node value={val} key={k} {path} />
    </Entry>
  {/each}
</Expandable>
