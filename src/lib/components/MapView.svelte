<script lang="ts">
  import type { KeyType, TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<Map<unknown, unknown>>

  let { value, key = undefined, type, path = [] }: Props = $props()

  let keys = $derived([...value.keys()])
  let entries = $derived<[KeyType, unknown][]>([...value.entries()] as [KeyType, unknown][])

  // let preview = $derived<[KeyType, unknown][]>(entries.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet valuePreview({ showPreview })}
    <Preview
      keyValue={entries}
      prefix={'{'}
      postfix={'}'}
      type="map"
      keyDelim="=>"
      keyStyle="gap: 0.5em;"
      {showPreview}
    />
  {/snippet}
  <PropertyList {value} {keys}>
    {#snippet item({ key, index })}
      <Expandable
        key={index}
        type=""
        value={[key, value.get(key)]}
        path={[...path, index]}
        length={2}
        showLength={false}
        keepPreviewOnExpand
      >
        {#snippet valuePreview({ showPreview })}
          <Preview
            keyValue={[[key as string, value.get(key)]]}
            prefix={'{'}
            postfix={'}'}
            keyDelim="=>"
            keyStyle="gap: 0.5em;"
            type="map"
            {showPreview}
          />
        {/snippet}
        <Entry i={0}>
          <Node key="key" value={key} path={[...path, index]} />
        </Entry>
        <Entry i={1}>
          <Node key="value" value={value.get(key)} path={[...path, index]} />
        </Entry>
      </Expandable>
    {/snippet}
  </PropertyList>
</Expandable>
