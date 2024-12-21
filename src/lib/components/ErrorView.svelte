<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getContext } from 'svelte'
  // import { untrack } from 'svelte'
  import Entry from './Entry.svelte'
  import JsonViewer from './Node.svelte'
  import StringValue from './StringValue.svelte'
  import Expandable from './Expandable.svelte'
  // import { stringify } from '$lib/util.js'

  type Props = TypeViewProps<Error>

  let { value = new Error(''), key, type = 'error', path }: Props = $props()

  let entries: [string, unknown][] = $state(
    Object.entries({
      name: value.name,
      message: value.message,
      stack: value.stack,
      cause: value.cause as any,
    }).filter(([, v]) => v != null)
  )

  let useDefaults = getContext<boolean>('error-use-defaults')

  // $inspect(stringify(entries))
</script>

<Expandable {value} {key} {type} {path} length={entries.length}>
  {#snippet val()}
    <StringValue {type} value={value.message}>
      {value.name}: {value.message}
    </StringValue>
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} usedefaults={useDefaults ?? false} />
    </Entry>
  {/each}
</Expandable>
