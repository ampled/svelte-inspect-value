<script lang="ts" generics="Type extends string = ValueType">
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
    children?: Snippet
    keepPreviewOnExpand?: boolean
    showLength?: boolean
  } & HTMLAttributes<HTMLDivElement>

  let {
    key,
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

  const previewLevel = getContext<number | undefined>('preview') ?? 0
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

<div class={['title-bar', previewLevel && 'preview']} aria-expanded={!collapsed} {...rest}>
  {#if !previewLevel && !isKey}
    <div class="button-key">
      <CollapseButton
        bind:this={buttonComponent}
        {collapsed}
        {value}
        onchange={onCollapseChanged}
        disabled={length === 0}
        aria-label={`${collapsed ? 'expand' : 'collapse'} ${keyOrType}`}
        title={`${collapsed ? 'expand' : 'collapse'} ${keyOrType}`}
      />

      <Key {key} {path} ondblclick={() => onCollapseChanged(!collapsed)} />
    </div>
  {/if}
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
    data-testid="indent"
    class="indent {type}"
    oninspectvaluechange={() => buttonComponent?.flash()}
    in:slide={{ duration: options.value.noanimate ? 0 : 400 }}
    out:slide={{ duration: options.value.noanimate ? 0 : 400 }}
  >
    {@render children()}
  </div>
{/if}

<style>
  .title-bar {
    z-index: var(--index);
    position: sticky;
    top: 0;
    border-color: var(--border-color);
    border-bottom-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-left-width: 0;
    border-style: solid;
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
      /* gap: 0.25em; */
    }
  }

  .title-bar.preview {
    background-color: transparent;
    padding: 0;
  }

  .indent {
    margin-left: calc(var(--indent) * 1.5);
    padding-block: calc(var(--indent) * 0.5);
    border-left: 1px solid var(--border-color);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
  }
</style>
