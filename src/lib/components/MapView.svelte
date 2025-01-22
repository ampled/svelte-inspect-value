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
      map
      type="map"
      keyDelim="=>"
      keyStyle="gap: 0.25em;"
      {showPreview}
    />
  {/snippet}
  <PropertyList {value} {keys}>
    {#snippet item({ key, index })}
      {#if ['string', 'number', 'symbol'].includes(typeof key)}
        <Node key={key as string} value={value.get(key)} {path} />
      {:else}
        <Expandable
          key=""
          type="Entry"
          value={[key, value.get(key)]}
          path={[...path, index]}
          length={2}
          showLength={false}
        >
          {#snippet valuePreview({ showPreview })}
            <Preview
              keyValue={[[key as string, value.get(key)]]}
              prefix={'{'}
              postfix={'}'}
              keyDelim="=>"
              keyStyle="gap: 0.25em;"
              type="map"
              map
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
      {/if}
    {/snippet}
  </PropertyList>

  <!-- {#each entries as [mapKey, mapValue], i (mapKey)}
    <Entry {i}>
      {#if ['string', 'number', 'symbol'].includes(typeof mapKey)}
        <Node key={mapKey as string} value={mapValue} {path} />
      {:else}
        <Expandable
          key=""
          type="Entry"
          value={[mapKey, mapValue]}
          path={[...path, i]}
          length={2}
          showLength={false}
        >
          {#snippet valuePreview({ showPreview })}
            <Preview keyValue={[[mapKey, mapValue]]} hasMore={false} map {showPreview} />
          {/snippet}
          <Entry i={0}>
            <Node key="key" value={mapKey} path={[...path, i]} />
          </Entry>
          <Entry i={1}>
            <Node key="value" value={mapValue} path={[...path, i]} />
          </Entry>
        </Expandable>
      {/if}
    </Entry>
  {/each} -->
</Expandable>
