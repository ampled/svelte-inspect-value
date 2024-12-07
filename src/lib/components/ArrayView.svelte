<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { slide } from 'svelte/transition'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'
  import Entry from './Entry.svelte'

  type Props = TypeViewProps<any[]>

  let { value: arrayVal = [], key = undefined, type, path }: Props = $props()
</script>

<TitleBar {...{ value: arrayVal, key, type, path }} length={arrayVal.length}>
  {#each arrayVal as value, i (i)}
    <Entry {i}>
      <JsonViewer key={i} {value} {path} />
    </Entry>
  {/each}
</TitleBar>
