<script lang="ts">
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'

  import { getContext, onMount, type Snippet } from 'svelte'
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'

  import Type from './Type.svelte'
  import Key from './Key.svelte'
  import { stringifyPath } from '$lib/util.js'
  import type { TypeViewProps } from '$lib/types.js'
  import Tools from './Tools.svelte'
  import type { Collapse } from '$lib/collapse.svelte.js'
  import type { HTMLAttributes } from 'svelte/elements'
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

  let inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)

  let level = $derived(path.length)

  let collapsed = $state(true)

  // $inspect(collapseState)

  onMount(() => {
    // if (inspectState?.value?.[stringifyPath(path)] == null) {
    //   if (path.length === 0) {
    //     inspectState?.setCollapse(['root'], false)
    //   } else {
    //     inspectState?.setCollapse(path, level === 1 ? false : true)
    //   }
    // }
  })

  // $effect(() => {
  //   console.log('isCollapsed update:', isCollapsed)
  // })

  // $inspect(collapsed)

  function onCollapseChanged(newValue: boolean) {
    collapsed = newValue
    // inspectState?.setCollapse(path, newValue)
    // Object.keys(inspectState.value)
    //   .filter(
    //     (k) =>
    //       k.length < stringifyPath(path).length &&
    //       !k.startsWith(stringifyPath(path)) &&
    //       k !== stringifyPath(path)
    //   )
    //   .forEach((k) => {
    //     inspectState.value[k].collapsed = true
    //   })
  }

  // let state: StateContext = getContext('inspect-state')

  // let currentPath = $derived([...path].map((k) => k?.toString()).join('.'))

  // $effect(() => {
  //   untrack(() => {
  //     const wasCollapsed = state.getCollapse(currentPath)
  //     console.log({
  //       currentPath,
  //       wasCollapsed,
  //     })
  //     if (wasCollapsed !== undefined) {
  //       collapsed = wasCollapsed
  //     }
  //   })
  // })

  // $effect(() => {
  //   console.log('get collapse state from context')
  //   const wasCollapsed = state.getCollapse(currentPath)
  //   // if (typeof wasCollapsed)
  //   console.log({ path, wasCollapsed })
  //   if (typeof wasCollapsed === 'boolean') {
  //     collapsed = wasCollapsed
  //   }
  // })

  // $effect(() => {
  //   console.log('set collapse state from context')
  //   if (collapsed !== undefined) {
  //     state.setCollapse(currentPath, collapsed)
  //   }
  // })
</script>

<div class="title-bar" {...rest}>
  <div class="button-key">
    <CollapseButton
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
    <!-- <small>{level}</small> -->
    <!-- <Tools {value} {path} /> -->
  </div>
</div>

{#if children && length != null && length > 0}
  <div class="indent {type}" class:collapsed>
    {@render children()}
  </div>
{/if}

<style>
  .title-bar {
    background-color: var(--bg);
    width: 100%;
    position: sticky;
    top: 0;
    border-color: var(--border-color);
    border-bottom-width: 0px;
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
    padding-left: calc(var(--indent) * 0.5);
    /* margin-left: -0.5em; */
    /* padding-left: calc(0.25em); */
    /* width: calc(100% + 0.5em); */
    transition: all 0.2s ease-in-out;

    &:hover,
    &:focus-within {
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
