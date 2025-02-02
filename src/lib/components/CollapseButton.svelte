<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { flashOnUpdate } from '../action/update-flash.svelte.js'
  import Caret from '../icons/Caret.svelte'

  type Props = {
    collapsed?: boolean
    onchange?: (collapsed: boolean) => void
    value: unknown
    key?: string | symbol | number
    type?: string
  } & Omit<HTMLButtonAttributes, 'onchange' | 'value' | 'type'>

  let { collapsed = $bindable(), onchange, disabled, value, key, type, ...rest }: Props = $props()

  let options = useOptions()

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

  let keyOrType = $derived((key ?? type)?.toString())
</script>

<button
  data-testid="collapse-button"
  type="button"
  class="collapse"
  aria-label={`${collapsed ? 'expand' : 'collapse'} ${keyOrType}`}
  title={`${collapsed ? 'expand' : 'collapse'} ${keyOrType}`}
  {onclick}
  {disabled}
  {...rest}
  {onkeydown}
>
  <div
    use:flashOnUpdate={{
      value: () => value,
      enabled: () => options.value.flashOnUpdate,
      cb: (trigger) => (flashFn = trigger),
    }}
  >
    {#if disabled}
      &hyphen;
    {:else}
      <Caret style="rotate:{rotation}deg; transition: rotate 125ms ease-in-out;" />
    {/if}
  </div>
</button>

<style>
  .collapse {
    all: unset;
    margin: 0;
    padding: 0;
    border: none;
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
    user-select: none;
    transition: all 100ms linear;

    &:hover {
      background-color: transparent;
      color: var(--fg);
    }

    &:focus {
      color: var(--fg);
    }

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
