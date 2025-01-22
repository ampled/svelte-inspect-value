<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<unknown[]>

  let { value: arrayVal = [], key = undefined, type, path }: Props = $props()
</script>

<Expandable {...{ value: arrayVal, key, type, path }} length={arrayVal.length}>
  {#snippet valuePreview({ showPreview })}
    <Preview {path} list={arrayVal} prefix={'['} postfix={']'} {showPreview} />
  {/snippet}
  {#each arrayVal as value, i (i)}
    <Entry {i}>
      <Node key={i} {value} {path} />
    </Entry>
  {/each}
</Expandable>
