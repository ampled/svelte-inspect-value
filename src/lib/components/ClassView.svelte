<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import Preview from './Preview.svelte'

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  type Props = TypeViewProps<Function>

  let { value, key, type, path }: Props = $props()

  let entries = $derived(Object.entries(value))
  let preview = $derived(entries.slice(0, 3))
</script>

<Expandable {...{ value, key, type, path }} length={entries.length}>
  {#snippet valuePreview({ showPreview })}
    <span class="value {type}">
      {value.name}
    </span>
    <Preview
      keyValue={preview}
      prefix={'{'}
      postfix={'}'}
      hasMore={entries.length > preview.length}
      {showPreview}
    />
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
