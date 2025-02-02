<script lang="ts" generics="Type extends string = ValueType">
  import { getPreviewLevel } from '$lib/contexts.js'
  import { getContext, onMount, untrack, type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { slide } from 'svelte/transition'
  import { useOptions } from '../options.svelte.js'
  import { STATE_CONTEXT_KEY, type StateContext } from '../state.svelte.js'
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
  const inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)
  const previewLevel = getPreviewLevel()
  const isKey = getContext<boolean>('key')
  let collapseState = $derived.by(() => {
    const storedState = inspectState?.value?.[stringifyPath(path)]
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
    inspectState?.setCollapse(path, newValue)
  }

  onMount(() => {
    if (inspectState) {
      const storedState = inspectState.getCollapse(path)
      if (!storedState) {
        if (options.value.expandAll) {
          inspectState.setCollapse(path, false)
        } else {
          inspectState.setCollapse(path, path.length > options.value.expandLevel)
        }
      }
    }
  })
</script>

<div
  data-testid="expandable"
  class={['title-bar', previewLevel && 'preview', !showKey && 'nokey']}
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
    role="list"
    data-testid="indent"
    class="indent {type}"
    oninspectvaluechange={() => buttonComponent?.flash()}
    in:slide={{ duration: options.value.noanimate ? 0 : 200 }}
    out:slide={{ duration: options.value.noanimate ? 0 : 200 }}
  >
    {@render children()}
  </div>
{/if}

<style>
  .title-bar {
    z-index: var(--index);
    white-space: nowrap;
    top: 0;
    transition: background-color 0.2s ease-in-out;
    position: sticky;
    display: flex;
    gap: 0.5em;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    min-height: 1.5em;
    padding-left: calc(var(--indent) * 0.5);

    &:hover {
      background-color: var(--bg-lighter);
    }

    .indicator-and-key {
      display: inline-flex;
      align-items: center;
      gap: 0.25em;
      /* padding-left: 0.25em; */
      /* padding-left: 1px; */
    }
  }

  .title-bar.preview {
    background-color: transparent;
    padding: 0;
  }

  .title-bar.preview.nokey {
    gap: 0;

    .indicator-and-key {
      display: none;
    }
  }

  .indent {
    margin-left: calc(var(--indent) * 1.5);
    border-left: 1px solid var(--border-color);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    max-height: calc(52 * 1.5em);
  }
</style>
