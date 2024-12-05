<script lang="ts">
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'

  import { getContext, type Snippet } from 'svelte'
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'

  import Type from './Type.svelte'
  import Key from './Key.svelte'
  import type { ValueType } from '$lib/util.js'
  import type { KeyName } from '$lib/types.js'
  import Console from '$lib/icons/Console.svelte'
  import { copyToClipBoard, logToConsole } from '$lib/hello.js'
  import Copy from '$lib/icons/Copy.svelte'
  import Tools from './Tools.svelte'

  type Props = {
    key?: KeyName
    path?: KeyName[]
    length?: number
    type?: ValueType | string
    val?: Snippet
    value: any
    children?: Snippet
  }

  let { key, type, length, value, val, path = [], children }: Props = $props()

  let inspectState: StateContext = getContext(STATE_CONTEXT_KEY)

  let collapsed = $state(inspectState.getCollapse(path))

  function onCollapseChanged(newValue: boolean) {
    collapsed = newValue
    inspectState.setCollapse(path, newValue)
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

<div class="title-bar">
  <div class="button-key">
    <CollapseButton
      {collapsed}
      onchange={onCollapseChanged}
      disabled={length === 0}
      aria-label="expand {key?.toString()}"
      title="expand {key?.toString()}"
    />

    <Key {key} {path} />
  </div>

  <Type {type} />

  {#if val}
    {@render val()}
  {/if}
  {#if length}
    <Entries {length} {type} />
  {/if}
  <div class="tools">
    <Tools {value} />
  </div>
</div>

{#if children}
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
    border-color: var(--base03, gray);
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
