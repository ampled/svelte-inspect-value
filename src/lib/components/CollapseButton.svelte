<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { scale } from 'svelte/transition'
  import Caret from '../icons/Caret.svelte'
  import { useOptions } from '../options.svelte.js'
  import Bullet from './Bullet.svelte'

  type Props = {
    collapsed?: boolean
    onchange?: (collapsed: boolean) => void
    value: unknown
    key?: string | symbol | number
    type?: string
  } & Omit<HTMLButtonAttributes, 'onchange' | 'value' | 'type'>

  let {
    collapsed = $bindable(),
    onchange,
    onclick,
    disabled,
    value,
    key,
    type,
    ...rest
  }: Props = $props()

  let options = useOptions()

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

  let caret = $state<ReturnType<typeof Caret>>()

  export function flash() {
    caret?.flash()
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
  {#if disabled}
    <Bullet />
  {:else}
    <div in:scale={{ duration: options.transitionDuration }}>
      <Caret
        bind:this={caret}
        {value}
        style="rotate:{rotation}deg; transition: rotate 125ms ease-in-out; width: 100%; height: 100%;"
      />
    </div>
  {/if}
</button>

<style>
  .collapse {
    all: unset;
    margin: 0;
    padding: 0;
    border: none;
    all: unset;
    overflow: visible;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: var(--_caret-color);
    aspect-ratio: 1 / 1;
    width: 1em;
    height: 1em;
    min-width: 1em;
    max-width: 1em;
    user-select: none;
    transition: all 100ms linear;

    &:hover {
      background-color: transparent;
      color: var(--_caret-hover-color);
    }

    &:focus {
      color: var(--_caret-focus-color);
    }

    &:focus-visible {
      color: var(--_caret-focus-color);
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
