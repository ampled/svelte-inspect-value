<script lang="ts">
  import Caret from '$lib/icons/Caret.svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type Props = {
    collapsed?: boolean
    onchange?: (collapsed: boolean) => void
  } & Omit<HTMLButtonAttributes, 'onchange'>

  let { collapsed = $bindable(), onchange, ...rest }: Props = $props()

  function onclick() {
    const newValue = !collapsed
    if (onchange) {
      onchange(newValue)
    } else {
      collapsed = newValue
    }
  }
</script>

<button type="button" class="collapse" {onclick} {...rest}>
  <!-- {#if collapsed}
    +
  {:else}
    -
  {/if} -->
  <!-- <span style:rotate={collapsed ? '0deg' : '90deg'}>&#9656;</span> -->
  <Caret style="rotate:{collapsed ? '0deg' : '90deg'}; transition: rotate 100ms ease-in-out" />
</button>

<style>
  button.collapse {
    all: unset;
    overflow: hidden;
    /* line-height: 1em; */
    /* height: 0.9em; */
    /* font-size: 1.5em; */
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: var(--comments);
    aspect-ratio: 1 / 1;
    width: 1em;
    height: 1em;
    /* border: 1px solid; */
  }
</style>
