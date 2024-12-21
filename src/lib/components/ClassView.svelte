<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import OneLineView from './OneLineView.svelte'

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  type Props = TypeViewProps<Function>

  let { value = class Foo {}, key, type, path }: Props = $props()

  let entries = $derived(Object.entries(value))
</script>

{#if entries.length}
  <Expandable {...{ value, key, type, path }} length={entries.length}>
    {#snippet val()}
      <span class="value {type}">
        {value.name}
        <span class="funcbody">
          {'{ ... }'}
        </span>
      </span>
    {/snippet}
    {#each entries as [key, value], i (key)}
      <Entry {i}>
        <JsonViewer {value} {key} {path} />
      </Entry>
    {/each}
  </Expandable>
{:else}
  <OneLineView {value} {key} {type} {path}>
    {#snippet val()}
      <span class="value {type}">
        {value.name.trim()}
        <span class="funcbody">
          {'{ ... }'}
        </span>
      </span>
    {/snippet}
  </OneLineView>
{/if}
