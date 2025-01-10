<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'

  type Props = TypeViewProps<Iterator<any, any, any>>

  let { value = [].values(), key = undefined, type, path }: Props = $props()

  let entries = $state<any[]>([])

  // $inspect(value)
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet valuePreview()}
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
