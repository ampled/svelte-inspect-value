<script lang="ts">
  import { setContext } from 'svelte'
  import { InspectError, type TypeViewProps } from '../types.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import Node from './Node.svelte'
  import StringValue from './StringValue.svelte'

  type Props = TypeViewProps<InspectError, 'InspectError'> & { reset: () => void }

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

  console.log(
    JSON.stringify(
      {
        message: value.message,
        cause: (value.cause as Error)?.message,
      },
      undefined,
      2
    )
  )
</script>

<Expandable {value} {key} {type} {path} length={entries.length} keepPreviewOnExpand>
  {#snippet valuePreview()}
    <span>⚠️</span>
    <button class="reset" onclick={reset}>RESET</button>
    <StringValue type="error" value={value.message} />
  {/snippet}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <Node {value} {key} {path} usedefaults />
    </Entry>
  {/each}
</Expandable>

<style>
  button.reset {
    all: unset;
    font-size: 0.8em;
    height: 1.5em;
    line-height: 1.5em;
    color: var(--interactive);
    background-color: var(--bg);
    outline: 1px solid var(--interactive);
    padding-inline: 0.5em;
    cursor: pointer;

    &:hover {
      background-color: var(--interactive);
      color: var(--bg);
    }
  }
</style>
