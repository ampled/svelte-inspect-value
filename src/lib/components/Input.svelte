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
  input::-webkit-search-cancel-button {
    visibility: hidden;
  }

  .siv-input {
    display: flex;
    align-items: center;
    outline: 1px solid var(--_button-color);
    border-radius: 2px;
    background-color: var(--_background-color);
    width: 100%;
    height: 1.5em;
    font-size: 1em;
    font-family: var(--inspect-font);

    input {
      all: unset;
      transition:
        color 150ms,
        background-color 250ms,
        outline-color 150ms,
        transform 150ms;
      transition-timing-function: ease-in-out;
      /* cursor: default; */
      border: none !important;
      background-color: transparent;
      padding-inline: 0.5em;
      width: 100%;
      height: 100%;
      color: var(--_button-color);
      font-weight: normal;
      font-size: 1em;
      line-height: 1.5em;
      font-family: var(--inspect-font);
      user-select: none;
    }

    input::-webkit-input-placeholder {
      color: var(--_comment-color);
      font-style: italic;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1/1;
      height: 100%;
    }

    &:has(:disabled) {
      cursor: default;
      outline-color: var(--_button-disabled-color);
      color: var(--_button-disabled-color);
    }

    &:has(:active:not(:disabled)) {
      outline: 1px solid var(--_button-color);
      background-color: var(--_background-color);
      color: var(--_button-color);
      /* transform: scaleY(0.85); */
    }

    &:has(:hover:not(:disabled):not(:active)),
    &:has(:focus-visible) {
      outline-width: 2px;
      outline-offset: -1px;
      background-color: var(--_background-color);
      color: var(--_button-color);
    }

    &:has(.valid) {
      outline-color: var(--_button-success-color);
      color: var(--_button-success-color);
    }

    &:has(.invalid) {
      outline-color: var(--_error-color);
      color: var(--_error-color);
    }
  }
</style>
