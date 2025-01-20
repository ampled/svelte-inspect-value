<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<unknown[]>

  let { value: arrayVal = [], key = undefined, type, path }: Props = $props()

  let preview = $derived(arrayVal.slice(0, 3))
</script>

<Expandable {...{ value: arrayVal, key, type, path }} length={arrayVal.length}>
  {#snippet valuePreview({ showPreview })}
    <Preview
      list={preview}
      hasMore={preview.length < arrayVal.length}
      prefix={'['}
      postfix={']'}
      {showPreview}
    />
  {/snippet}
  {#each arrayVal as value, i (i)}
    <Entry {i}>
      <Node key={i} {value} {path} />
    </Entry>
  {/each}
</Expandable>
