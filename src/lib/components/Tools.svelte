<script lang="ts">
  import { blur } from 'svelte/transition'
  import { copyToClipBoard, logToConsole } from '../hello.svelte.js'
  import CollapseChildren from '../icons/CollapseChildren.svelte'
  import Console from '../icons/Console.svelte'
  import Copy from '../icons/Copy.svelte'
  import ExpandChildren from '../icons/ExpandChildren.svelte'
  import { useOptions } from '../options.svelte.js'
  import { useState, type NodeState } from '../state.svelte.js'
  import type { KeyType, TypeViewProps } from '../types.js'
  import { stringifyPath } from '../util.js'

  type Props = Partial<TypeViewProps<unknown, string>> & { collapsed?: boolean }

  let { value, type, path = [] }: Props = $props()

  let copied = $state(false)

  let options = useOptions()
  let inspectState = useState()
  let stringifiedPath = $derived(stringifyPath(path))

  let level = $derived(path.length)

  let canCopy = $derived(
    ['array', 'object', 'number', 'string', 'undefined', 'null', 'date', 'boolean'].includes(
      type ?? ''
    )
  )

  let nodeState = $derived(inspectState.value[stringifyPath(path)])

  let hasExpandedChildren = $derived.by(() => {
    const children = Object.entries(inspectState.value).filter(
      ([k]) => k.startsWith(stringifiedPath) && k.split('.').length === level + 1
    )
    return children.some(([, v]) => !v.collapsed)
  })

  let timeout = $state<number>()

  async function copy(val: unknown) {
    try {
      await copyToClipBoard(val)
      copied = true
      if (timeout) window.clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        copied = false
      }, 5000)
    } catch (e) {
      console.error(e)
      copied = false
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
</script>

{#if options.value.showTools}
  <div class="tools" class:borderless={options.value.borderless}>
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
      onclick={() => logToConsole(path, value, type)}
    >
      <Console />
    </button>
    {#if canCopy}
      <button
        type="button"
        title="copy value to clipboard"
        aria-label="copy value to clipboard"
        onclick={() => copy(value)}
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
