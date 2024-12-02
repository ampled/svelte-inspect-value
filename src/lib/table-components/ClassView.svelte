<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import Key from './Key.svelte'
  import ObjectView from './ObjectView.svelte'
  import TitleBar from './TitleBar.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Function>

  let { value = class Foo {}, key, type }: Props = $props()

  let entries = $derived(Object.entries(value))

  let collapsed = $state(false)
</script>

{#if entries.length}
  <TitleBar {key} {type} length={entries.length} value={value.name} bind:collapsed />
  <div class="indent" class:collapsed>
    {#each entries as [key, value], i (key)}
      <div class="entry">
        <JsonViewer {value} {key} />
      </div>
    {/each}
  </div>
{:else}
  <Key {key} />
  <Type {type} />
  <span class="value {type}">
    {value.name.trim()}
  </span>
  {'{ ... }'}
{/if}
<!-- <ObjectView {value} {key} {type} /> -->
