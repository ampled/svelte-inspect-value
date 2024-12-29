<script lang="ts">
  import { STATE_CONTEXT_KEY, type StateContext } from '$lib/state.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { stringifyPath } from '$lib/util.js'
  import { getContext, type Component } from 'svelte'
  import CollapseButton from './CollapseButton.svelte'
  import Key from './Key.svelte'

  type Props = TypeViewProps<unknown> & { ValueComponent: Component<TypeViewProps> }

  let { ValueComponent, path = [], value, key, ...rest }: Props = $props()

  let inspectState: StateContext | undefined = getContext(STATE_CONTEXT_KEY)

  // let level = $derived(path.length)
  let collapseState = $derived(inspectState?.value?.[stringifyPath(path)])
  let collapsed = $derived(collapseState ? collapseState.collapsed : true)

  function onCollapseChanged(newValue: boolean) {
    inspectState?.setCollapse(path, newValue)
  }

  let buttonComponent = $state<ReturnType<typeof CollapseButton>>()
</script>

<div class="item">
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

  <ValueComponent {value} {key} {path} {...rest} />
</div>

<style>
  .button-key {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--indent) * 0.5);
    padding-left: 1px;
    /* gap: 0.25em; */
  }
</style>
