<script lang="ts">
  import { flashOnUpdate } from '$lib/action/update-flash.svelte.js'
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
    return 450
  })

  function onkeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    // event.preventDefault()
    if (onchange) {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          onchange(false)
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          onchange(true)
          break
        default:
          break
      }
    }
  }

  let flashFn = $state<() => void>()

  export function flash() {
    flashFn?.()
  }
</script>

<button type="button" class="collapse" {onclick} {disabled} {...rest} {onkeydown}>
  <div use:flashOnUpdate={{ value: () => value, cb: (trigger) => (flashFn = trigger) }}>
    {#if disabled}
      &hyphen;
    {:else}
      <Caret style="rotate:{rotation}deg; transition: rotate 500ms var(--ease-out-back);" />
    {/if}
  </div>
</button>

<style>
  .collapse {
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

    &:focus-visible {
      color: var(--fg);
      transform: scale(1.2);
    }

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
</style>
