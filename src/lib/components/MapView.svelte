<script lang="ts">
  import type { KeyType, TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<Map<unknown, unknown>>

  let { value, key = undefined, type, path = [] }: Props = $props()

  let entries = $derived<[KeyType, unknown][]>([...value.entries()] as [KeyType, unknown][])

  let preview = $derived<[KeyType, unknown][]>(entries.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet valuePreview({ showPreview })}
    <Preview
      keyValue={preview}
      prefix={'{'}
      postfix={'}'}
      hasMore={entries.length > preview.length}
      map
      {showPreview}
    />
  {/snippet}

  {#each entries as [mapKey, mapValue], i (mapKey)}
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
  {/each}
</Expandable>
