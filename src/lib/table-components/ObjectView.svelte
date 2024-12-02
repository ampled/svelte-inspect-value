<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<object>

  let { value = {}, key = undefined, type }: Props = $props()

  let entries: [string | symbol, any][] = $derived(
    // @ts-expect-error
    Reflect.ownKeys(value).map((key) => [key, value[key]])
  )

  let collapsed = $state(false)
</script>

<TitleBar {key} {type} length={entries.length} bind:collapsed />
<div class="indent" class:collapsed>
  {#each entries as [key, value], i (key)}
    <div class="entry">
      <JsonViewer {value} {key} />
    </div>
  {/each}
</div>
