<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity'
  import DeleteIcon from '../icons/DeleteIcon.svelte'
  import type { NodeAction, TypeViewProps } from '../types.js'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<Set<unknown>>

  let { value, key, type, path, ...rest }: Props = $props()

  let entries = $derived([...value.entries()].map(([_, v]) => v))
  let keys = $derived([...entries.keys()])
  let isSvelteSet = $derived(value instanceof SvelteSet)

  const childActions: NodeAction[] = [
    {
      title: 'remove from set',
      icon: DeleteIcon,
      shouldShow: (val) => value.has(val) && isSvelteSet,
      action: (val) => {
        value.delete(val)
      },
    },
  ]
</script>

<Expandable
  {...{ value, key, type, path }}
  length={entries.length}
  {...rest}
  type={isSvelteSet ? 'SvelteSet' : type}
>
  {#snippet valuePreview({ showPreview })}
    <Preview list={entries} prefix={'{'} postfix={'}'} showKey={false} {showPreview} />
  {/snippet}
  <PropertyList {value} {keys}>
    {#snippet item({ key, index })}
      <Node {path} key={index} value={entries[key]} actions={childActions} />
    {/snippet}
  </PropertyList>
</Expandable>
