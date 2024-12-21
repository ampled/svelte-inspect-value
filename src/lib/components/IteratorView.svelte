<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { slide } from 'svelte/transition'
  import JsonViewer from './Node.svelte'
  import Expandable from './Expandable.svelte'
  import Entry from './Entry.svelte'
  import { stringify } from '$lib/util.js'

  type Props = TypeViewProps<Iterator<any, any, any>>

  let { value = [].values(), key = undefined, type, path }: Props = $props()

  let entries = $state<any[]>([])

  // $inspect(value)
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <button
      onclick={() => {
        entries.push(value.next())
      }}>next</button
    >
  {/snippet}
  {#each entries as value, i (i)}
    <Entry {i}>
      <JsonViewer key={i} {value} {path} />
    </Entry>
  {/each}
</Expandable>
