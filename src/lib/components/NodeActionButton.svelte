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
    color: var(--interactive);
    background-color: var(--bg);
    outline: 1px solid var(--interactive);
    padding-inline: 0.5em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 150ms ease-in-out;
    transform-origin: bottom center;

    &:disabled {
      cursor: default;
      color: var(--border-color);
      outline-color: var(--border-color);
    }

    &:active:not(:disabled) {
      color: var(--interactive);
      background-color: var(--bg);
      outline: 1px solid var(--interactive);
      transform: scaleY(0.85);
    }

    &:hover:not(:disabled):not(:active),
    &:focus-visible {
      background-color: var(--interactive);
      color: var(--bg);
    }
  }
</style>
