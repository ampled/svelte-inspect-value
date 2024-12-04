<script lang="ts">
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'

  import { getContext, type Snippet } from 'svelte'
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'

  import Type from './Type.svelte'
  import Key from './Key.svelte'
  import type { ValueType } from '$lib/util.js'
  import type { KeyName } from '$lib/types.js'

  type Props = {
    key?: KeyName
    path?: KeyName[]
    length: number
    type?: ValueType
    val?: Snippet
    children?: Snippet
  }

  let { key, type, length, val: value, path = [], children }: Props = $props()

  let inspectState: StateContext = getContext(STATE_CONTEXT_KEY)

  let collapsed = $state(inspectState.getCollapse(path))

  $effect(() => {
    inspectState.setCollapse(path, collapsed)
  })

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
      bind:collapsed
      disabled={length === 0}
      aria-label="expand {key?.toString()}"
      style="opacity: {length > 0 ? 1 : 0.4}"
    />
    <Key {key} {path} />
  </div>

  <Type {type} />

  {#if value}
    {@render value()}
  {/if}
  {#if ['map', 'set', 'url', 'urlsearchparams', 'object', 'array', 'class'].includes(type as any)}
    <Entries {length} />
  {/if}
</div>

{#if children}
  <div class="indent {type}" class:collapsed>
    {@render children()}
  </div>
{/if}

<style>
  .button-key {
    display: inline-flex;
    align-items: center;
  }

  .title-bar {
    width: 100%;
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
    margin-left: -1em;
    width: calc(100% + 1em);

    &:hover {
      background-color: var(--bg-lighter);
    }
  }
</style>
