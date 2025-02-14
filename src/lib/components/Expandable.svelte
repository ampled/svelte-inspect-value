<script lang="ts" generics="Type extends string = ValueType">
  import { getPreviewLevel } from '$lib/contexts.js'
  import { slideXY } from '$lib/transition/slideXY.js'
  import { getContext, onMount, untrack, type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { useOptions } from '../options.svelte.js'
  import { useState } from '../state.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { stringifyPath, type ValueType } from '../util.js'
  import CollapseButton from './CollapseButton.svelte'
  import Count from './Count.svelte'
  import Key from './Key.svelte'
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
    ...rest
  }: Props = $props()

  let buttonComponent = $state<ReturnType<typeof CollapseButton>>()
  const options = useOptions()
  const inspectState = useState()
  const previewLevel = getPreviewLevel()
  const isKey = getContext<boolean>('key')
  let collapseState = $derived.by(() => {
    const storedState = inspectState.value[stringifyPath(path)]
    if (storedState) {
      return storedState
    } else {
      return untrack(() => ({
        collapsed: path.length > options.value.expandLevel && !options.value.expandAll,
      }))
    }
  })

  let collapsed = $derived(collapseState.collapsed)

  function onCollapseChanged(newValue: boolean) {
    inspectState.setCollapse(path, { collapsed: newValue })
  }

  onMount(() => {
    if (inspectState && previewLevel === 0) {
      const storedState = inspectState.getCollapse(path)
      if (!storedState) {
        if (options.value.expandAll) {
          inspectState.setCollapse(path, {
            collapsed: false,
            hasChildren: length != null && length > 0,
          })
        } else {
          inspectState.setCollapse(path, {
            collapsed: path.length > options.value.expandLevel,
            hasChildren: length != null && length > 0,
          })
        }
      }
    }
  })
</script>

<div
  data-testid="expandable"
  class={['line', 'title-bar', previewLevel && 'preview', !showKey && 'nokey']}
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
        onchange={onCollapseChanged}
        disabled={length === 0}
      />
    {/if}
    {#if showKey}
      <Key
        ondblclick={() => onCollapseChanged(!collapsed)}
        onclick={() => onCollapseChanged(!collapsed)}
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
    {#if showLength}
      <Count {length} {type} />
    {/if}

    <Tools {value} {path} {collapsed} {type} />
  {/if}
</div>

{#if children && length != null && length > 0 && !collapsed && !previewLevel}
  <div
    oninspectvaluechange={() => buttonComponent?.flash()}
    role="list"
    data-testid="indent"
    class="indent {type}"
    transition:slideXY={{ duration: options.transitionDuration * 2 }}
  >
    {@render children()}
  </div>
{/if}

<style>
  @import './styles/line.css';

  .indent {
    margin-left: calc(var(--indent) * 1.5);
    border-left: 1px solid var(--border-color);
    overflow-x: clip;
    overflow-y: auto;
    position: relative;
    max-height: calc(102 * 1.5em);
  }
</style>
