<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { slide } from 'svelte/transition'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'
  import Entry from './Entry.svelte'
  import { getType, stringify } from '$lib/util.js'
  import Type from './Type.svelte'

  type Props = TypeViewProps<any[]>

  let { value: arrayVal = [], key = undefined, type, path }: Props = $props()

  let preview = $derived(arrayVal?.slice?.(0, 3) ?? [])
</script>

<div class="preview">
  {'['}
  {#each preview as val, i}
    {@const type = getType(val)}
    <span class="value {type}"> {stringify(val)}</span>{#if i !== 2},{/if}
  {/each}

  {#if preview.length < arrayVal.length}
    &hellip;
  {/if}
  ]
</div>
