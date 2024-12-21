<script lang="ts">
  import { InspectError, type TypeViewProps } from '$lib/types.js'
  import { setContext, untrack } from 'svelte'
  import StringValue from './StringValue.svelte'
  import Expandable from './Expandable.svelte'
  import JsonViewer from './Node.svelte'
  import Entry from './Entry.svelte'
  import { stringify } from '$lib/util.js'

  type Props = TypeViewProps<InspectError> & { reset: () => void }

  let { value = new InspectError(''), key, type = 'InspectError', path, reset }: Props = $props()

  let entries: [string, unknown][] = $derived(
    Object.entries({
      message: value.message,
      value: value.value,
      cause: value.cause,
      stack: value.stack,
    })
  )

  setContext('error-use-defaults', true)

  // $inspect(value.cause)
</script>

<Expandable {value} {key} {type} {path} length={entries.length}>
  {#snippet val()}
    <span>⚠️</span>
    <button onclick={reset}>RESET</button>
    <StringValue {type} value={value.message}>
      {value.message}
    </StringValue>
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} usedefaults />
    </Entry>
  {/each}
</Expandable>

<style>
  button {
    border: 1px solid var(--fg);
    padding-inline: 0.5em;
  }
</style>
