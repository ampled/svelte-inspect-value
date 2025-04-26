<script lang="ts" generics="Type extends string = ValueType">
  import { getContext, onMount, type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { getPreviewLevel } from '../contexts.js'
  import { useOptions } from '../options.svelte.js'
  import { useState } from '../state.svelte.js'
  import { slideXY } from '../transition/slideXY.js'
  import type { TypeViewProps } from '../types.js'
  import {
    neverExpandInitial,
    shouldInitiallyExpandNode,
    stringifyPath,
    type ValueType,
  } from '../util.js'
  import CollapseButton from './CollapseButton.svelte'
  import Count from './Count.svelte'
  import Key from './Key.svelte'
  import NodeNote from './NodeNote.svelte'
  import Tools from './Tools.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<unknown, Type> & {
    length?: number
    valuePreview: Snippet<[{ showPreview: boolean }]>
    forceType?: boolean
    keyDelim?: string
    showKey?: boolean
    children?: Snippet
    keepPreviewOnExpand?: boolean
    showLength?: boolean
  } & HTMLAttributes<HTMLDivElement>

  let {
    key,
    keyPrefix,
    keyDelim = ':',
    keyStyle,
    showKey = true,
    type,
    length,
    value,
    valuePreview,
    forceType = false,
    keepPreviewOnExpand = false,
    path = [],
    showLength = true,
    children,
    note,
    ...rest
  }: Props = $props()

  let buttonComponent = $state<ReturnType<typeof CollapseButton>>()
  const options = useOptions()
  let { expandAll, expandPaths, showLength: optsShowLength } = $derived(options.value)
  const inspectState = useState()
  const previewLevel = getPreviewLevel()
  const isKey = getContext<boolean>(Symbol.for('siv.key'))
  let stringifiedPath = $derived(stringifyPath(path))
  let collapseState = $derived(inspectState.value[stringifiedPath])
  let collapsed = $derived.by(() => {
    if (previewLevel) return true

    if (collapseState) {
      return collapseState.collapsed
    }
    // while waiting for onMount to run, check expandLevel.
    // this avoids playing the indent intro animation.
    return path.length > options.expandLevel || neverExpandInitial.includes(key)
  })

  onMount(() => {
    if (previewLevel) return

    if (inspectState && previewLevel === 0) {
      const storedState = inspectState.getCollapse(path)
      if (!storedState) {
        inspectState.setCollapse(path, {
          collapsed: !shouldInitiallyExpandNode(path, options.expandLevel, expandAll, expandPaths),
        })
      }
    }
  })

  function setCollapse(collapsed: boolean) {
    inspectState.setCollapse(stringifiedPath, { collapsed })
  }

  function toggleCollapse() {
    setCollapse(!collapsed)
  }
</script>

<div
  ondblclick={toggleCollapse}
  data-testid="expandable"
  class={['line', previewLevel && 'preview', !showKey && 'nokey']}
  aria-expanded={!collapsed}
  {...rest}
>
  <div class="indicator-and-key">
    {#if !previewLevel && !isKey}
      <CollapseButton
        bind:this={buttonComponent}
        {collapsed}
        {value}
        {key}
        {type}
        onclick={toggleCollapse}
        onchange={(c) => setCollapse(c)}
        disabled={length === 0}
      />
    {/if}
    {#if showKey}
      <Key
        disabled={previewLevel > 0 || length === 0}
        onclick={toggleCollapse}
        delim={keyDelim}
        prefix={keyPrefix}
        style={keyStyle}
        {key}
        {path}
      />
    {/if}
  </div>
  {#if !isKey}
    <Type {type} force={forceType} />
  {/if}

  {@render valuePreview({ showPreview: collapsed || previewLevel > 0 || keepPreviewOnExpand })}

  {#if !previewLevel}
    {#if note && !previewLevel}
      <NodeNote style="justify-self: right;" title={note.description}>{note.title}</NodeNote>
    {/if}

    {#if showLength && optsShowLength}
      <Count {length} {type} />
    {/if}

    <Tools {value} {path} {collapsed} {type}></Tools>
  {/if}
</div>

{#if children && length != null && length > 0 && !collapsed && !previewLevel}
  <div
    transition:slideXY={{ duration: options.transitionDuration * 2 }}
    oninspectvaluechange={() => buttonComponent?.flash()}
    role="list"
    data-testid="indent"
    class="indent {type}"
  >
    {@render children()}
  </div>
{/if}

<style>
  @import './styles/line.css';

  .indent {
    margin-left: var(--__indent);
    border-left: 1px solid var(--_indent-color);
    overflow-x: clip;
    overflow-y: auto;
    position: relative;
    max-height: calc(102 * 1.5em);
  }
</style>
