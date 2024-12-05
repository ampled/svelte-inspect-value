<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType } from '$lib/util.js'
  import JsonViewer from './JsonViewer.svelte'
  import Line from './Line.svelte'
  import OneLineView from './OneLineView.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<Map<any, any>>

  let { value = new Map(), key = undefined, type, path = [] }: Props = $props()

  let entries = $derived(Array.from(value.entries()))
</script>

{#snippet mapEntry(entry: [any, any], index: number)}
  {@const [key, value] = entry}
  {@const newPath = [...path, index]}

  <TitleBar {...{ value, type, path }} key={index}>
    {#snippet val()}
      <span class="value">MapEntry</span>
    {/snippet}
    <div class="entry">
      <JsonViewer key="key" value={key} path={newPath} />
    </div>
    <div class="entry">
      <JsonViewer key="value" {value} path={newPath} />
    </div>
  </TitleBar>
{/snippet}

<TitleBar {...{ value, key, type, path }} length={entries.length}>
  {#each entries as [mapKey, mapValue], i (mapKey)}
    <!-- {@render mapEntry([mapKey, mapValue], i)} -->

    <div class="entry" style="--index: {i}">
      {#if ['string', 'number', 'symbol'].includes(typeof mapKey)}
        <JsonViewer key={mapKey} value={mapValue} {path} />
      {:else}
        {@const keyType = getType(mapKey)}
        <JsonViewer key={`${i}: [${keyType} key]`} value={[mapKey, mapValue]} {path} />
      {/if}
    </div>
  {/each}
</TitleBar>
