<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'

  let { children, onclick, ...rest }: HTMLButtonAttributes = $props()

  let button = $state<HTMLButtonElement>()

  export function focus() {
    button?.focus()
  }
</script>

<button bind:this={button} type="button" {onclick} {...rest}>
  {@render children?.()}
</button>

<style>
  button {
    all: unset;
    font-family: var(--inspect-font);
    font-size: 0.8em;
    height: 1.5em;
    width: 1.5em;
    min-width: 1.5em;
    line-height: 1.5em;
    color: var(--_button-color);
    cursor: pointer;
    transition: all 150ms ease-in-out;
    transform-origin: bottom center;

    &:disabled {
      cursor: default;
      color: var(--border-disabled-color);
    }

    &:active:not(:disabled) {
      color: var(--_button-color);
      background-color: transparent;
      transform: scaleY(0.85);
    }

    &:hover:not(:disabled):not(:active),
    &:focus-visible {
      background-color: transparent;
      color: var(--_text-color);
    }
  }
</style>
