<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import Key from './Key.svelte'
  import StringValue from './StringValue.svelte'
  import TitleBar from './TitleBar.svelte'
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
    search,
    username,
  } = $derived(value)

  let entries = $derived(
    Object.entries({
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
      search,
      username,
    }).filter((prop) => !!prop[1].toString())
  )
</script>

{#if entries.length}
  <TitleBar {key} {type} {path} length={entries.length}>
    {#snippet val()}
      <StringValue value={value.toString()} />
    {/snippet}
    {#each entries as [key, value] (key)}
      <div class="entry">
        <JsonViewer {value} {key} {path} />
      </div>
    {/each}
  </TitleBar>
{:else}
  <Key {key} {path} />
  <Type {type} />
  <span class="value {type}">
    {value.toString()}
  </span>
{/if}
<!-- <ObjectView {value} {key} {type} /> -->
