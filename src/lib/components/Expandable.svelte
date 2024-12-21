<script lang="ts">
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'

  import { getContext, onMount, setContext, untrack, type Component, type Snippet } from 'svelte'
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'

  import Type from './Type.svelte'
  import Key from './Key.svelte'
  import { stringifyPath } from '$lib/util.js'
  import type { TypeViewProps } from '$lib/types.js'
  import Tools from './Tools.svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { useOptions } from '$lib/options.svelte.js'
  import { slide } from 'svelte/transition'
  import { backInOut, backOut } from 'svelte/easing'

  type Props = TypeViewProps<any> & {
    length?: number
    val?: Snippet
    children?: Snippet
    showLength?: boolean
  } & HTMLAttributes<HTMLDivElement>

  let {
    key,
    type,
    length,
    value,
    val,
    path = [],
    showLength = true,
    children,
    ...rest
  }: Props = $props()

  let { expandAll, expandLevel, noanimate } = $derived(useOptions())
  let inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)

  let level = $derived(path.length)
  let collapseState = $derived(inspectState?.value?.[stringifyPath(path)])
  let collapsed = $derived(collapseState ? collapseState.collapsed : true)

  onMount(() => {
    if (inspectState) {
      const storedState = inspectState.getCollapse(path)
      if (!storedState) {
        if (expandAll) {
          inspectState.setCollapse(path, false)
        } else {
          inspectState.setCollapse(path, level > expandLevel)
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
</script>

<div class="title-bar" {...rest}>
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

  <Type {type} />

  {#if val}
    {@render val()}
  {/if}

  {#if showLength}
    <Entries {length} {type} />
  {/if}

  <div class="tools">
    <Tools {value} {path} {collapsed} />
  </div>
</div>

{#if children && length != null && length > 0 && !collapsed}
  <div
    transition:slide={{ axis: 'x', duration: noanimate ? 0 : 400 }}
    oninspectvaluechange={() => buttonComponent?.flash()}
  >
    <div
      class="indent {type}"
      in:slide={{ easing: backOut, duration: noanimate ? 0 : 400 }}
      out:slide={{ duration: noanimate ? 0 : 400 }}
    >
      {@render children()}
    </div>
  </div>
{/if}

<style>
  .title-bar {
    background-color: var(--bg);
    z-index: var(--index);
    width: 100%;
    position: sticky;
    top: 0;
    border-color: var(--border-color);
    border-bottom-width: 0px;
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
    padding-left: calc(var(--indent) * 0.5);
    /* margin-left: -0.5em; */
    /* padding-left: calc(0.25em); */
    /* width: calc(100% + 0.5em); */
    transition: all 0.2s ease-in-out;

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
</style>
