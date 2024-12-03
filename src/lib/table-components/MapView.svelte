<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType } from '$lib/util.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<Map<any, any>>

  let { value = new Map(), key = undefined, type, path }: Props = $props()

  let entries = $derived(Array.from(value.entries()))
  let collapsed = $state(true)
</script>

<TitleBar {key} {type} length={entries.length} bind:collapsed />
<div class="indent" class:collapsed>
  {#each entries as [mapKey, mapValue] (mapKey)}
    <div class="entry">
      {#if ['string', 'number', 'symbol'].includes(typeof mapKey)}
        <JsonViewer key={mapKey} value={mapValue} {path} />
      {:else}
        {@const keyType = getType(mapKey)}
        <JsonViewer key={`[${keyType} key]`} value={[mapKey, mapValue]} {path} />
      {/if}
    </div>
  {/each}
</div>
