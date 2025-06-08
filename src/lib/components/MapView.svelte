<script lang="ts">
  import type { NodeAction, TypeViewProps } from '../types.js'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'
  import { SvelteMap } from 'svelte/reactivity'
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte'

  type Props = TypeViewProps<Map<unknown, unknown>>

  let { value: map, key, path = [], ...rest }: Props = $props()

  let value = $state<Map<unknown, unknown> | undefined>(map)
  let isSvelteMap = $derived(value instanceof SvelteMap)
  let keys = $derived(value ? [...value.keys()] : [])
  let entries = $derived<[PropertyKey, unknown][]>(
    value ? ([...value.entries()] as [PropertyKey, unknown][]) : []
  )

  const childActions: NodeAction<[unknown, unknown]>[] = [
    {
      title: 'remove from map',
      icon: DeleteIcon,
      shouldShow: ([key]) => value?.has(key),
      action: ([key]) => {
        map.delete(key)
        value = undefined
        value = map
      },
    },
  ]
</script>

<Expandable
  {value}
  {key}
  {path}
  length={entries.length}
  {...rest}
  type={isSvelteMap ? 'SvelteMap' : 'Map'}
>
  {#snippet valuePreview({ showPreview })}
    <Preview
      keyValue={entries}
      prefix={'{'}
      postfix={'}'}
      keyDelim="=>"
      keyStyle="margin-right: 0.5em;"
      {showPreview}
    />
  {/snippet}

  <PropertyList {value} {keys}>
    {#snippet item({ key, index })}
      <Node
        forceView="mapentry"
        {path}
        key={index}
        value={[key, value?.get(key)]}
        actions={childActions}
      />
    {/snippet}
  </PropertyList>
</Expandable>
