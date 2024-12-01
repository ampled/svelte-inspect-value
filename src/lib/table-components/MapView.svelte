<script lang="ts">
  import Key from './Key.svelte'

  import type { TypeViewProps } from '$lib/types.js'
  import CollapseButton from './CollapseButton.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import Type from './Type.svelte'
  import Entries from './Entries.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<Map<any, any>>

  let { value = new Map(), key = undefined, type }: Props = $props()

  let entries = $derived.by(() => {
    let fromEntries = Object.fromEntries(value)
    console.log('fromEntries:', fromEntries)
    return Reflect.ownKeys(fromEntries).map((key) => [key, fromEntries[key]])
  })

  // $inspect(Object.entries(value))
  // $inspect('entries', entries)
  // $inspect(value)
  let collapsed = $state(false)
</script>

{#if key}
  <TitleBar {key} {type} length={entries.length} bind:collapsed />
{/if}
{#if !collapsed}
  <div class="indent">
    <!-- <div class="object-view"> -->
    {#each entries as [key, value] (key)}
      <div class="entry">
        <JsonViewer {value} {key} />
      </div>
    {/each}
    <!-- </div> -->
  </div>
{/if}
