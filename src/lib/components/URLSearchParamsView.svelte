<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType, stringify } from '$lib/util.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Key from './Key.svelte'
  import JsonViewer from './Node.svelte'
  import Preview from './Preview.svelte'

  type Props = TypeViewProps<URLSearchParams>

  let { value = new URLSearchParams(), key = undefined, type, path }: Props = $props()

  let entries = $derived.by(() => {
    let entries: Record<string, string | string[]> = {}

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

  let preview = $derived(entries.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <!-- <StringValue value={value.toString()} /> -->
    <!-- <ArrayPreview value={entries} /> -->
    <Preview list={preview} prefix={'('} postfix={')'} hasMore={entries.length > preview.length}>
      {#snippet item(i)}
        {@const val = i[1]}
        {@const valType = getType(val)}
        <Key key={i[0]} />
        <!-- <Type type={valType} /> -->

        {#if valType === 'undefined'}
          undefined
        {:else if valType === 'null'}
          null
        {:else if Array.isArray(val)}
          <!-- {val.map((e) => stringify(e)).join(', ')} -->
          {#each val as entry, i}
            <span class="value string">{stringify(entry)}</span>
            {#if val.length > i + 1}
              ,
            {/if}
          {/each}
          <!-- {stringify(val.join(','))} -->
          <!-- {stringifyOrToString(i[1])} -->
        {:else}
          <span class="value string">{stringify(val)}</span>
        {/if}
      {/snippet}
    </Preview>
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
