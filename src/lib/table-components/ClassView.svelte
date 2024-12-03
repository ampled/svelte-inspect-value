<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import Key from './Key.svelte'
  import TitleBar from './TitleBar.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Function>

  let { value = class Foo {}, key, type, path }: Props = $props()

  let entries = $derived(Object.entries(value))

  let collapsed = $state(true)
</script>

{#if entries.length}
  <TitleBar {key} {type} {path} length={entries.length} bind:collapsed>
    {#snippet val()}
      <span class="value {type}">{value.name}</span>
    {/snippet}
  </TitleBar>
  <div class="indent" class:collapsed>
    {#each entries as [key, value] (key)}
      <div class="entry">
        <JsonViewer {value} {key} {path} />
      </div>
    {/each}
  </div>
{:else}
  <Key {key} {path} />
  <Type {type} />
  <span class="value {type}">
    {value.name.trim()}
  </span>
  {'{ ... }'}
{/if}
<!-- <ObjectView {value} {key} {type} /> -->
