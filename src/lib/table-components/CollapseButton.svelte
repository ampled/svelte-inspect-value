<script lang="ts">
  import Caret from '$lib/icons/Caret.svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type Props = {
    collapsed?: boolean
  } & HTMLButtonAttributes

  let { collapsed = $bindable(), ...rest }: Props = $props()
</script>

<button class="collapse" onclick={() => (collapsed = !collapsed)} {...rest}>
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
    aspect-ratio: 1 / 1;
    width: 1em;
    height: 1em;
    /* border: 1px solid; */
  }
</style>
