<script lang="ts">
  import { getContext } from 'svelte'
  import { copyToClipBoard, logToConsole } from '../hello.js'
  import CollapseChildren from '../icons/CollapseChildren.svelte'
  import Console from '../icons/Console.svelte'
  import Copy from '../icons/Copy.svelte'
  import ExpandChildren from '../icons/ExpandChildren.svelte'
  import Settings from '../icons/Settings.svelte'
  import { useOptions } from '../options.svelte.js'
  import { STATE_CONTEXT_KEY, type StateContext } from '../state.svelte.js'
  import type { KeyType, TypeViewProps } from '../types.js'
  import { stringifyPath } from '../util.js'

  type Props = Partial<TypeViewProps<unknown>> & { collapsed?: boolean }

  let { value, type = '', path = [] }: Props = $props()

  let copied = $state(false)

  let options = useOptions()
  let inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)

  let level = $derived(path.length)

  let canCopy = $derived(
    ['array', 'object', 'number', 'string', 'undefined', 'null', 'date', 'boolean'].includes(type)
  )

  // const hasChildren = $derived.by(() => {
  //   if (inspectState?.value) {
  //     const key = stringifyPath(path)
  //     return Object.entries(inspectState.value).filter(
  //       ([k]) => k.startsWith(key) && k.length > key.length
  //     )
  //   }
  // })

  const children = $derived(
    inspectState?.value
      ? Object.entries(inspectState.value).filter(
          ([k]) => k.startsWith(stringifyPath(path)) && k !== stringifyPath(path)
        )
      : []
  )

  let hasExpandedChildren = $derived.by(() => {
    if (inspectState?.value) {
      const key = stringifyPath(path)
      const children = Object.entries(inspectState.value).filter(
        ([k]) => k.startsWith(key) && k.split('.').length === level + 1
      )
      return children.some(([, v]) => !v.collapsed)
    }
    return false
  })

  let timeout: number = $state(-1)

  async function copy(val: unknown) {
    try {
      await copyToClipBoard(val)
      copied = true
      if (timeout) window.clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        copied = false
      }, 5000)
    } catch {
      copied = false
    }
  }

  let collapseAction = {
    hint: 'collapse children',
    action: (level: number, path: KeyType[]) => inspectState?.collapseChildren(level, path),
    icon: CollapseChildren,
  }

  let expandAction = {
    hint: 'expand children',
    action: (level: number, path: KeyType[]) => inspectState?.expandChildren(level, path),
    icon: ExpandChildren,
  }

  let treeAction = $derived(hasExpandedChildren ? collapseAction : expandAction)
</script>

<div class="tools">
  {#if options.value.showTools}
    <!-- <small>hasExpandedChildren: {hasExpandedChildren}</small> -->
    {#if children.length}
      <button
        title={treeAction.hint}
        aria-label={treeAction.hint}
        onclick={() => treeAction.action(level, path)}
      >
        <treeAction.icon />
      </button>
    {/if}
    <button
      title="log value to console"
      aria-label="log value to console"
      onclick={() => logToConsole(path, value)}
    >
      <Console />
    </button>
    {#if canCopy}
      <button
        title="copy value to clipboard"
        aria-label="copy value to clipboard"
        onclick={() => copy(value)}
        class:copied
      >
        <Copy />
      </button>
    {/if}
  {/if}
  {#if level === 1}
    <button title="options" aria-label="options" onclick={() => (options.value.open = true)}>
      <Settings />
    </button>
  {/if}
</div>

<style>
  :global(.line:hover) .tools,
  :global(.line:focus-within) .tools,
  :global(.title-bar:hover) .tools,
  :global(.title-bar:focus-within) .tools {
    /* opacity: 1; */
    display: flex;
  }

  .tools {
    transition: 0.3s ease-in-out;
    /* background-color: var(--bg); */
    /* border: 1px solid var(--border-color); */
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-inline: 0.5em;
    display: none;
    justify-content: center;
    align-items: center;
    gap: 0.25em;
    /* opacity: 0; */
    max-height: 1.5em;
    overflow: visible;

    button {
      all: unset;
      padding: 2px;
      margin: 0;
      border: none;
      /* transition: all 300ms ease-in-out; */
      height: 1.5em;
      width: 1.5em;
      color: var(--interactive);

      &.copied {
        color: var(--green) !important;
      }

      &:hover,
      &:focus-visible {
        color: var(--fg);
      }
    }
  }
</style>
