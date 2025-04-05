<script lang="ts">
  import { getContext, setContext } from 'svelte'
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

  setContext(Symbol.for('siv.use-defaults'), true)
  const depth = getContext<number | undefined>(Symbol.for('siv.error-depth')) ?? 0
  setContext(Symbol.for('siv.error-depth'), depth + 1)
</script>

{#if depth <= 3}
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
{:else}
  max error depth exceeded
{/if}
