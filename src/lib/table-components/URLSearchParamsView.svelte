<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<URLSearchParams>

  let { value = new URLSearchParams(), key = undefined, type }: Props = $props()

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

<TitleBar {key} {type} length={entries.length} value={value.toString()} bind:collapsed />
<div class="indent" class:collapsed>
  {#each entries as [key, value], i (i)}
    <div class="entry">
      <JsonViewer {value} {key} />
    </div>
  {/each}
</div>
