<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType } from '$lib/util.js'
  import Entry from './Entry.svelte'
  import Node from './Node.svelte'
  import Expandable from './Expandable.svelte'

  type Props = TypeViewProps<Map<any, any>>

  let { value = new Map(), key = undefined, type, path = [] }: Props = $props()

  let entries = $derived(Array.from(value.entries()))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#each entries as [mapKey, mapValue], i (mapKey)}
    <Entry {i}>
      {#if ['string', 'number', 'symbol'].includes(typeof mapKey)}
        <Node key={mapKey} value={mapValue} {path} />
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
        >
          {#snippet val()}
            <span style="display: flex; align-items: center; gap: 0;color: var(--comments)">
              {'<'}<span class="type {keyType}">{keyType}</span>,
              <span class="type {valueType}"> {valueType}</span>{'>'}
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
