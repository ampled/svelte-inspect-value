<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'
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
    disabled?: boolean
  } & SvelteHTMLElements['div']

  let { collapsed = $bindable(), onchange, disabled, value, key, type, ...rest }: Props = $props()

  let options = useOptions()

  let rotation = $derived.by(() => {
    if (disabled) return 180
    if (collapsed) return 0
    return 90
  })

  let caret = $state<ReturnType<typeof Caret>>()

  export function flash() {
    caret?.flash()
  }

  let keyOrType = $derived((key ?? type)?.toString())
</script>

<div
  data-testid="collapse-button"
  class="collapse"
  aria-label={`${collapsed ? 'expand' : 'collapse'} ${keyOrType}`}
  {...rest}
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
</div>

<style>
  .collapse {
    all: unset;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: color 250ms ease-in-out;
    margin: 0;
    border: none;
    padding: 0;
    aspect-ratio: 1 / 1;
    width: 1em;
    min-width: 1em;
    max-width: 1em;
    height: 1em;
    overflow: visible;
    color: var(--_caret-color);
    user-select: none;

    &:hover {
      background-color: transparent;
      color: var(--_caret-hover-color);
    }

    &:focus {
      color: var(--_caret-focus-color);
    }

    &:focus-visible {
      transform: scale(1.2);
      color: var(--_caret-focus-color);
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
