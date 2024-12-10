<script lang="ts">
  import { browser } from '$app/environment'
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<Set<any>>

  let { value = new Set(), key = undefined, type, path }: Props = $props()

  let entries = $derived(Array.from(value.entries()))

  console.log('browser:', browser)
  $inspect(value.entries())
  $inspect('hello')
</script>

<TitleBar {...{ value, key, type, path }} length={entries.length}>
  {#each entries as [key, value], i (i)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</TitleBar>
