<script lang="ts">
  import Caret from '$lib/icons/Caret.svelte'
  import { getType, stringify } from '$lib/util.js'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { slide } from 'svelte/transition'

  type Props = {
    collapsed?: boolean
    onchange?: (collapsed: boolean) => void
    value: unknown
  } & Omit<HTMLButtonAttributes, 'onchange'>

  let { collapsed = $bindable(), onchange, disabled, value, ...rest }: Props = $props()

  function onclick() {
    const newValue = !collapsed
    if (onchange) {
      onchange(newValue)
    } else {
      collapsed = newValue
    }
  }

  let rotation = $derived.by(() => {
    if (disabled) return 180
    if (collapsed) return 0
    return 90
  })

  let type = $derived(getType(value))

  let changeDetect = $derived.by(() => {
    if (type === 'object' || type === 'array' || type === 'string' || type === 'number') {
      return stringify(value)
    }
    return ''
  })
</script>

<button type="button" class="collapse" {onclick} {disabled} {...rest}>
  {#key changeDetect}
    <!-- {#if collapsed}
    +
  {:else}
    -
  {/if} -->
    <!-- <span style:rotate={collapsed ? '0deg' : '90deg'}>&#9656;</span> -->
    <div class="flash-update">
      {#if disabled}
        &hyphen;
      {:else}
        <Caret style="rotate:{rotation}deg; transition: rotate 100ms ease-in-out" />
      {/if}
    </div>
  {/key}
</button>

<style>
  button.collapse {
    all: unset;
    overflow: hidden;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: var(--comments);
    aspect-ratio: 1 / 1;
    width: 1em;
    height: 1em;

    &:disabled {
      cursor: default;
    }

    * {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  @keyframes flash {
    /* 0% {
  } */

    10% {
      color: var(--bg-light);
      /* transform: scale(100, 50); */
    }

    100% {
      /* rotate: 360deg; */
      /* color: var(--comments); */
    }
  }

  .flash-update {
    /* transform-origin: center left; */
    /* animation: flash 500ms; */
    animation: flash ease-out 500ms 1;
    /* animation-name: flash;
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-timing-function: linear; */
  }
</style>
