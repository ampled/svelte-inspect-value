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
    line-height: 1.5em;
    color: var(--_button-color);
    background-color: var(--_background-color);
    outline: 1px solid var(--_button-color);
    padding-inline: 0.5em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 150ms ease-in-out;
    transform-origin: bottom center;

    &:disabled {
      cursor: default;
      color: var(--border-disabled-color);
      outline-color: var(--border-disabled-color);
    }

    &:active:not(:disabled) {
      background-color: var(--_background-color);
      color: var(--_button-color);
      outline: 1px solid var(--_button-color);
      transform: scaleY(0.85);
    }

    &:hover:not(:disabled):not(:active),
    &:focus-visible {
      background-color: var(--_button-color);
      color: var(--_background-color);
    }
  }
</style>
