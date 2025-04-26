<script lang="ts">
  import type { TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<Map<unknown, unknown>>

  let { value, key = undefined, type, path = [], ...rest }: Props = $props()

  let keys = $derived([...value.keys()])
  let entries = $derived<[PropertyKey, unknown][]>([...value.entries()] as [PropertyKey, unknown][])
</script>

<Expandable {...{ value, key, type, path }} length={entries.length} {...rest}>
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
            keyValue={[[key as PropertyKey, value.get(key)]]}
            prefix={'{'}
            postfix={'}'}
            keyDelim="=>"
            keyStyle="margin-right: 0.5em;"
            {showPreview}
          />
        {/snippet}
        <Entry i={0}>
          <Node key="key" value={key} path={[...path, index]} />
        </Entry>
        <Entry i={1}>
          <Node key="value" value={value?.get(key)} path={[...path, index]} />
        </Entry>
      </Expandable>
    {/snippet}
  </PropertyList>
</Expandable>
