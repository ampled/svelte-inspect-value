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
    transform-origin: bottom center;
    transition:
      color 250ms ease-in-out,
      background-color 250ms ease-in-out,
      transform 250ms ease-in-out;
    cursor: pointer;
    width: 1.5em;
    min-width: 1.5em;
    height: 1.5em;
    color: var(--_button-color);
    font-size: 1em;
    line-height: 1.5em;
    font-family: var(--inspect-font);
    text-align: center;

    &:disabled {
      cursor: default;
      color: var(--_button-disabled-color) !important;
    }

    &:active:not(:disabled) {
      transform: scaleY(0.85);
      background-color: transparent;
      color: var(--_button-color);
    }

    &:hover:not(:disabled):not(:active),
    &:focus-visible {
      background-color: transparent;
      color: var(--_text-color);
    }
  }
</style>
