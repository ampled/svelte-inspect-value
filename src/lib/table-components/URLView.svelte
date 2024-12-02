<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import Key from './Key.svelte'
  import TitleBar from './TitleBar.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<URL>

  let { value = new URL(''), key, type }: Props = $props()

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
    username
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
      username
    })
  )

  let collapsed = $state(true)
</script>

{#if entries.length}
  <TitleBar {key} {type} length={entries.length} value={value.toString()} bind:collapsed />
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
    {value.toString()}
  </span>
{/if}
<!-- <ObjectView {value} {key} {type} /> -->
