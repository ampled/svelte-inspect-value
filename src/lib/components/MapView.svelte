<script lang="ts">
  import type { KeyName, TypeViewProps } from '../types.js'
  import { getType } from '../util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import Preview from './Preview.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Map<unknown, unknown>>

  let { value, key = undefined, type, path = [] }: Props = $props()

  let entries = $derived<[KeyName, unknown][]>([...value.entries()] as [KeyName, unknown][])

  let preview = $derived<[KeyName, unknown][]>(entries.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <Preview
      keyValue={preview}
      prefix={'<'}
      postfix={'>'}
      hasMore={entries.length > preview.length}
    />
  {/snippet}

  {#each entries as [mapKey, mapValue], i (mapKey)}
    <Entry {i}>
      {#if ['string', 'number', 'symbol'].includes(typeof mapKey)}
        <Node key={mapKey as string} value={mapValue} {path} />
      {:else}
        {@const keyType = getType(mapKey)}
        {@const valueType = getType(mapValue)}
        <Expandable
          key=""
          type="MapEntry"
          value={[mapKey, mapValue]}
          path={[...path, i]}
          length={2}
          showLength={false}
          keepPreviewOnExpand
        >
          {#snippet val()}
            <span style="display: flex; align-items: center; gap: 0;color: var(--comments)">
              <!-- {'<'}<span class="type {keyType}">{keyType}</span>,
              <span class="type {valueType}"> {valueType}</span>{'>'} -->
              {'<'}<Type type={keyType} />,<Type type={valueType} />{'>'}
            </span>
          {/snippet}
          <Entry i={0}>
            <Node key="key" value={mapKey} path={[...path, i, 'key']} />
          </Entry>
          <Entry i={1}>
            <Node key="value" value={mapValue} path={[...path, i, 'value']} />
          </Entry>
        </Expandable>
      {/if}
    </Entry>
  {/each}
</Expandable>
