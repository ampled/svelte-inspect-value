<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import ArrayPreview from './ArrayPreview.svelte'
  import { slide } from 'svelte/transition'
  import JsonViewer from './Node.svelte'
  import Expandable from './Expandable.svelte'
  import Entry from './Entry.svelte'
  import { getType, stringify } from '$lib/util.js'
  import Type from './Type.svelte'

  let { value: arrayVal = [], key = undefined, type, path }: TypeViewProps<any[]> = $props()

  let preview = $derived(arrayVal?.slice?.(0, 3) ?? [])
</script>

<div class="preview">
  {'['}
  {#each preview as val, i}
    {@const type = getType(val)}

    <span class="value {type}">
      {#if type === 'array'}
        <ArrayPreview value={val} />
      {:else}
        {val === undefined ? 'undefined' : stringify(val)}
      {/if}</span
    >
    {#if i !== 2},{/if}
  {/each}

  {#if preview.length < arrayVal.length}
    &hellip;
  {/if}
  ]
</div>

<style>
  .preview {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
