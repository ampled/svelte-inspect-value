<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { stringify } from '$lib/util.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<URLSearchParams>

  let { value = new URLSearchParams(), key = undefined, type, path }: Props = $props()

  let entries = $derived.by(() => {
    let entries: Record<string, any> = {}

    for (const key of value.keys()) {
      if (!Object.hasOwn(entries, key)) {
        const all = value.getAll(key)
        if (all.length === 1) {
          entries[key] = all[0]
        } else {
          entries[key] = all
        }
      }
    }

    return Object.entries(entries)
  })

  let collapsed = $state(true)
</script>

<TitleBar {key} {type} length={entries.length} bind:collapsed>
  {#snippet val()}
    <span class="value string">{stringify(value.toString())}</span>
  {/snippet}
</TitleBar>
<div class="indent" class:collapsed>
  {#each entries as [key, value] (key)}
    <div class="entry">
      <JsonViewer {value} {key} {path} />
    </div>
  {/each}
</div>
