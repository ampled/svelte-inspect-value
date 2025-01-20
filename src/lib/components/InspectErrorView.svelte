<script lang="ts">
  import { setContext } from 'svelte'
  import { InspectError, type TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import NodeActionButton from './NodeActionButton.svelte'
  import StringValue from './StringValue.svelte'

  type Props = TypeViewProps<InspectError, 'InspectError'> & { reset: () => void }

  let {
    value = new InspectError(''),
    key,
    type = 'InspectError',
    path,
    keyPrefix,
    reset,
  }: Props = $props()

  let entries: [string, unknown][] = $derived(
    Object.entries({
      message: value.message,
      value: value.value,
      cause: value.cause,
      stack: value.stack,
    })
  )

  setContext('error-use-defaults', true)
</script>

<Expandable {value} {key} {keyPrefix} {path} {type} length={entries.length} keepPreviewOnExpand>
  {#snippet valuePreview()}
    <NodeActionButton onclick={reset}>RESET</NodeActionButton>
    <StringValue type="error" value={value.message} />
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} usedefaults />
    </Entry>
  {/each}
</Expandable>
