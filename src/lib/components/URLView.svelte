<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import JsonViewer from './Node.svelte'
  import Key from './Key.svelte'
  import StringValue from './StringValue.svelte'
  import Expandable from './Expandable.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<URL>

  let { value = new URL(''), key, type, path }: Props = $props()

  let {
    hash,
    host,
    hostname,
    href,
    origin,
    searchParams,
    password,
    pathname,
    port,
    protocol,
    username,
  } = $derived(value)

  let entries = $derived(
    Object.entries({
      protocol,
      username,
      password,
      host,
      port,
      pathname,
      hash,
      hostname,
      origin,
      href,
      searchParams,
    }).filter((prop) => !!prop[1].toString())
  )
</script>

{#if entries.length}
  <Expandable {...{ value, key, type, path }} length={entries.length}>
    {#snippet val()}
      <StringValue value={value.toString()}>
        <a href={value.toString()} target="_blank" rel="noreferrer">{value.toString()}</a>
      </StringValue>
    {/snippet}
    {#each entries as [key, value], i (key)}
      <Entry {i}>
        <JsonViewer {value} {key} {path} />
      </Entry>
    {/each}
  </Expandable>
{:else}
  <Key {key} {path} />
  <Type {type} />
  <span class="value {type}">
    {value.toString()}
  </span>
{/if}
<!-- <ObjectView {value} {key} {type} /> -->
