<script lang="ts" generics="Type extends string = ValueType">
  import { getPreviewLevel } from '$lib/contexts.js'
  import { getContext, onMount, type Snippet } from 'svelte'
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

  let options = useOptions()
  let inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)
  let collapseState = $derived(inspectState?.value?.[stringifyPath(path)])
  let collapsed = $derived(collapseState ? collapseState.collapsed : true)
  let keyOrType = $derived((key ?? type)?.toString())
  let buttonComponent = $state<ReturnType<typeof CollapseButton>>()

  const previewLevel = getPreviewLevel()
  const isKey = getContext<boolean>('key')

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

  function onCollapseChanged(newValue: boolean) {
    inspectState?.setCollapse(path, newValue)
  }
</script>

<div
  data-testid="expandable"
  class={['title-bar', previewLevel && 'preview', !showKey && 'nokey']}
  aria-expanded={!collapsed}
  {...rest}
>
  <div class="button-key">
    {#if !previewLevel && !isKey}
      <CollapseButton
        bind:this={buttonComponent}
        {collapsed}
        {value}
        onchange={onCollapseChanged}
        disabled={length === 0}
        aria-label={`${collapsed ? 'expand' : 'collapse'} ${keyOrType}`}
        title={`${collapsed ? 'expand' : 'collapse'} ${keyOrType}`}
      />
    {/if}
    {#if showKey}
      <Key
        delim={keyDelim}
        prefix={keyPrefix}
        style={keyStyle}
        {key}
        {path}
        ondblclick={() => onCollapseChanged(!collapsed)}
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
    position: sticky;
    top: 0;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
    min-height: 1.5em;
    padding-left: calc(var(--indent) * 0.5);
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--bg-lighter);
    }

    .button-key {
      display: inline-flex;
      align-items: center;
      gap: calc(var(--indent) * 0.5);
      padding-left: 1px;
    }
  }

  .title-bar.preview {
    background-color: transparent;
    padding: 0;
  }

  .title-bar.preview.nokey {
    gap: 0;
  }

  .indent {
    margin-left: calc(var(--indent) * 1.5);
    border-left: 1px solid var(--border-color);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
  }
</style>
