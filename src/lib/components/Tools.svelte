<script lang="ts">
  import { getContext, onDestroy } from 'svelte'
  import { blur } from 'svelte/transition'
  import { globalInspectState } from '../Panel.svelte'
  import { addToPanel, globalValues } from '../global.svelte.js'
  import { copyToClipBoard, logToConsole } from '../hello.svelte.js'
  import CollapseChildren from '../icons/CollapseChildren.svelte'
  import Console from '../icons/Console.svelte'
  import Copy from '../icons/Copy.svelte'
  import ExpandChildren from '../icons/ExpandChildren.svelte'
  import { useOptions } from '../options.svelte.js'
  import { useState, type NodeState } from '../state.svelte.js'
  import type { KeyType, TypeViewProps } from '../types.js'
  import { isPromise, stringifyPath } from '../util.js'
  import NodeActionButton from './NodeActionButton.svelte'

  type Props = Partial<TypeViewProps<unknown, string>> & { collapsed?: boolean }

  let { value, type, path = [] }: Props = $props()

  let copied = $state(false)

  const fixed = getContext(Symbol.for('siv.fixed'))
  let options = useOptions()
  let { onCopy, canCopy, onLog, borderless, showTools } = $derived(options.value)
  let inspectState = useState()
  let stringifiedPath = $derived(stringifyPath(path))

  let level = $derived(path.length)

  let showCopyButton = $derived.by(() => {
    if (onCopy) {
      if (canCopy) return canCopy(value, type!, path)
      return true
    }

    return ['array', 'object', 'number', 'string', 'undefined', 'null', 'date', 'boolean'].includes(
      type ?? ''
    )
  })

  let nodeState = $derived(inspectState.value[stringifyPath(path)])

  let hasExpandedChildren = $derived.by(() => {
    const children = Object.entries(inspectState.value).filter(
      ([k]) => k.startsWith(stringifiedPath) && k.split('.').length === level + 1
    )
    return children.some(([, v]) => !v.collapsed)
  })

  let copyTimeout = $state<number>()

  function onCopySuccess() {
    copied = true
    if (copyTimeout) window.clearTimeout(copyTimeout)
    copyTimeout = window.setTimeout(() => {
      copied = false
    }, 5000)
  }

  async function runCustomCopy() {
    let ret: ReturnType<NonNullable<typeof onCopy>>
    try {
      ret = onCopy!($state.snapshot(value), $state.snapshot(type!), $state.snapshot(path))
      if (isPromise(ret)) {
        const wasCopied = await ret
        if (wasCopied) onCopySuccess()
      } else if (typeof ret === 'boolean') {
        if (ret) onCopySuccess()
      }
    } catch (e) {
      console.error('[Inspect] error running custom onCopy callback:', e)
      copied = false
    }
  }

  async function copy() {
    if (onCopy) {
      runCustomCopy()
    } else {
      try {
        await copyToClipBoard(value)
        onCopySuccess()
      } catch (e) {
        console.error(e)
        copied = false
      }
    }
  }

  function log() {
    if (onLog) {
      onLog(value, type!, path)
    } else {
      logToConsole(path, value, type)
    }
  }

  let collapseAction = {
    hint: 'collapse children',
    action: (level: number, path: KeyType[]) => inspectState.collapseChildren(level, path),
    icon: CollapseChildren,
  }

  let expandAction = {
    hint: 'expand children',
    action: (level: number, path: KeyType[]) => inspectState.expandChildren(level, path),
    icon: ExpandChildren,
  }

  function getTreeAction(nodeState: NodeState) {
    if (nodeState) {
      if (nodeState.collapsed) {
        return expandAction
      } else if (hasExpandedChildren) {
        return collapseAction
      } else {
        return expandAction
      }
    }
    return undefined
  }

  let treeAction = $derived(getTreeAction(nodeState))
  let remove = $state<() => void>()

  onDestroy(() => {
    if (remove) remove()
  })
</script>

{#if showTools}
  <div class="tools" class:borderless>
    {#if !fixed && !globalValues.has(stringifiedPath) && globalInspectState.mounted.length}
      <NodeActionButton
        title="add to panel"
        onclick={() => (remove = addToPanel(stringifiedPath, () => value, 'added manually'))}
      >
        +
      </NodeActionButton>
    {/if}
    {#if globalValues.has(stringifiedPath)}
      <NodeActionButton
        title="remove from panel"
        onclick={() => globalValues.delete(stringifiedPath)}>-</NodeActionButton
      >
    {/if}
    {#if treeAction}
      <button
        transition:blur={{ duration: options.transitionDuration }}
        type="button"
        title={treeAction.hint}
        aria-label={treeAction.hint}
        onclick={() => treeAction.action(level, path)}
      >
        <treeAction.icon />
      </button>
    {/if}
    <button
      type="button"
      title="log value to console"
      aria-label="log value to console"
      onclick={() => log()}
    >
      <Console />
    </button>
    {#if showCopyButton}
      <button
        type="button"
        title="copy value to clipboard"
        aria-label="copy value to clipboard"
        onclick={() => copy()}
        class:copied
      >
        <Copy />
      </button>
    {/if}
  </div>
{/if}

<style>
  :global(.line:hover) .tools,
  :global(.line:focus-within) .tools,
  :global(.title-bar:hover) .tools,
  :global(.title-bar:focus-within) .tools {
    opacity: 1;
    display: flex;
    transition: all 250ms ease-in-out allow-discrete;
  }

  .tools {
    transition: all 250ms ease-in-out allow-discrete;
    background-color: var(--_tools-background-color);
    border-left: 1px solid var(--_tools-border-color);
    backdrop-filter: blur(1px);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-inline: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25em;
    opacity: 0;
    max-height: 1.5em;
    z-index: calc(var(--index) + 1);
    flex-wrap: nowrap;
    overflow: clip;

    button {
      all: unset;
      padding: 2px;
      margin: 0;
      border: none;
      height: 1.5em;
      min-height: 1.5em;
      width: 1.5em;
      min-width: 1.5em;
      color: var(--_button-color);
      cursor: pointer;

      :global(svg) {
        transition: color 250ms ease-in-out;
      }

      &.copied {
        color: var(--_button-success-color) !important;
      }

      &:hover,
      &:focus-visible {
        background-color: transparent;
        color: var(--_text-color);
      }
    }
  }

  .tools.borderless {
    position: relative;
    transition-property: opacity !important;
    background-color: var(--_tools-background-color-borderless);
    border-left: 0;
  }
</style>
