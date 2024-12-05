<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import Key from './Key.svelte'
  import OneLineView from './OneLineView.svelte'
  import TitleBar from './TitleBar.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Function>

  let { value = class Foo {}, key, type, path }: Props = $props()

  let entries = $derived(Object.entries(value))
</script>

{#if entries.length}
  <TitleBar {...{ value, key, type, path }} length={entries.length}>
    {#snippet val()}
      <span class="value {type}">
        {value.name}
        <span class="funcbody">
          {'{ ... }'}
        </span>
      </span>
    {/snippet}
    {#each entries as [key, value] (key)}
      <div class="entry">
        <JsonViewer {value} {key} {path} />
      </div>
    {/each}
  </TitleBar>
{:else}
  <OneLineView {key} {type} {path}>
    <span class="value {type}">
      {value.name.trim()}
      <span class="funcbody">
        {'{ ... }'}
      </span>
    </span>
  </OneLineView>
{/if}
