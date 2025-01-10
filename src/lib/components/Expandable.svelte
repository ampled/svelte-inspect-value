<script lang="ts">
  import { STATE_CONTEXT_KEY, type StateContext } from '../state.svelte.js'

  import { getContext, onMount, type Snippet } from 'svelte'
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'

  import type { HTMLAttributes } from 'svelte/elements'
  import { slide } from 'svelte/transition'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { stringifyPath } from '../util.js'
  import Key from './Key.svelte'
  import Tools from './Tools.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<unknown> & {
    length?: number
    valuePreview?: Snippet
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

  // let parentCollapsed = getContext<(() => boolean) | undefined>('parent-collapsed')
  // setContext('parent-collapsed', () => parentCollapsed?.() || collapsed)

  function onCollapseChanged(newValue: boolean) {
    inspectState?.setCollapse(path, newValue)
  }

  let buttonComponent = $state<ReturnType<typeof CollapseButton>>()

  const isPreview = getContext<boolean>('preview')
</script>

<div class="title-bar" {...rest} class:isPreview>
  {#if !isPreview}
    <div class="button-key">
      <CollapseButton
        bind:this={buttonComponent}
        {collapsed}
        {value}
        onchange={onCollapseChanged}
        disabled={length === 0}
        aria-label="expand {key?.toString()}"
        title="expand {key?.toString()}"
      />

      <Key {key} {path} ondblclick={() => onCollapseChanged(!collapsed)} />
    </div>
  {/if}
  <Type {type} />

  {#if valuePreview && (collapsed || isPreview || keepPreviewOnExpand)}
    {@render valuePreview()}
    <!-- <div transition:slide={{ axis: 'x' }}>
      <div transition:slide>
      </div>
    </div> -->
  {/if}

  {#if showLength && !isPreview}
    <Entries {length} {type} />
  {/if}

  {#if !isPreview}
    <Tools {value} {path} {collapsed} {type} />
  {/if}
</div>

{#if children && length != null && length > 0 && !collapsed && !isPreview}
  <div
    transition:slide={{ axis: 'x', duration: options.value.noanimate ? 0 : 400 }}
    oninspectvaluechange={() => buttonComponent?.flash()}
  >
    <div
      class="indent {type}"
      in:slide={{ duration: options.value.noanimate ? 0 : 400 }}
      out:slide={{ duration: options.value.noanimate ? 0 : 400 }}
    >
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .title-bar {
    /* background-color: var(--bg); */
    z-index: var(--index);
    /* width: 100%; */
    position: sticky;
    top: 0;
    border-color: var(--border-color);
    border-bottom-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-left-width: 0;
    border-style: solid;
    /* z-index: 10000; */
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
    min-height: 1.5em;
    padding-left: calc(var(--indent) * 0.5);
    /* margin-left: -0.5em; */
    /* padding-left: calc(0.25em); */
    /* width: calc(100% + 0.5em); */
    /* transition: all 0.2s ease-in-out; */

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
  }

  .indent {
    margin-left: calc(var(--indent) * 1.5);
    padding-block: calc(var(--indent) * 0.5);
    border-left: 1px solid var(--border-color);
    overflow: hidden;
  }
</style>
