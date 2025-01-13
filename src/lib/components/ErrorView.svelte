<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import StringValue from './StringValue.svelte'

  type Props = TypeViewProps<Error>

  let { value, key, type = 'error', path }: Props = $props()
  let useDefaults = getContext<boolean>('error-use-defaults')

  let entries: [string, unknown][] = $state(
    Object.entries({
      name: value.name,
      message: value.message,
      stack: value.stack,
      cause: value.cause,
    }).filter(([, v]) => v != null)
  )
</script>

<Expandable {value} {key} {type} {path} length={entries.length} keepPreviewOnExpand>
  {#snippet valuePreview()}
    <StringValue {type} value={value.message}>
      {value.toString()}
    </StringValue>
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} usedefaults={useDefaults ?? false} />
    </Entry>
  {/each}
</Expandable>
