<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { slide } from 'svelte/transition'
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import Key from './Key.svelte'
  import TitleBar from './TitleBar.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<any[]>

  let { value: arrayVal = [], key = undefined, type }: Props = $props()
  let collapsed = $state(false)
</script>

{#if key}
  <TitleBar {key} bind:collapsed length={arrayVal.length} {type} />
{/if}
{#if !collapsed}
  <div
    class="indent"
    out:slide|global={{ duration: 300, delay: 1000 }}
    in:slide|global={{ duration: 300 }}
  >
    {#each arrayVal as value, i (i)}
      <div
        class="entry"
        out:slide|global={{ axis: 'x', delay: 20 * i }}
        in:slide|global={{ axis: 'x', delay: 30 * i }}
      >
        <JsonViewer key={i} {value} />
      </div>
    {/each}
  </div>
{/if}
