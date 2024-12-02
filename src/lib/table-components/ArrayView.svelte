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

<!-- {#if key != } -->
<TitleBar {key} bind:collapsed length={arrayVal.length} {type} />
<!-- {/if} -->
<div class="indent" class:collapsed>
  {#each arrayVal as value, i (i)}
    <div class="entry">
      <JsonViewer key={i} {value} />
    </div>
  {/each}
</div>
