<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  type Props = {
    busy?: boolean
  } & SvelteHTMLElements['input']

  let { onclick, busy, disabled, value = $bindable(''), ...rest }: Props = $props()

  let input = $state<HTMLInputElement>()

  export function focus() {
    input?.focus()
  }
</script>

<input
  bind:this={input}
  bind:value
  type="text"
  disabled={disabled || busy}
  aria-busy={busy}
  {...rest}
/>

<style>
  input {
    all: unset;
    font-family: var(--inspect-font);
    font-size: 0.8em;
    height: 1.5em;
    line-height: 1.5em;
    color: var(--_button-color);
    background-color: var(--_background-color) !important;
    outline: 1px solid var(--_button-color);
    padding-inline: 0.5em;
    cursor: pointer;
    border: none !important;
    border-radius: 2px;
    transition:
      color 150ms,
      background-color 250ms,
      outline-color 150ms,
      transform 150ms;
    transition-timing-function: ease-in-out;
    transform-origin: bottom center;
    user-select: none;
    font-weight: normal;

    &:disabled {
      cursor: default;
      color: var(--border-disabled-color);
      outline-color: var(--border-disabled-color);
    }

    &:active:not(:disabled) {
      background-color: var(--_background-color);
      color: var(--_button-color);
      outline: 1px solid var(--_button-color);
      /* transform: scaleY(0.85); */
    }

    &:hover:not(:disabled):not(:active),
    &:focus-visible {
      background-color: var(--_background-color);
      color: var(--_button-color);
    }
  }
</style>
