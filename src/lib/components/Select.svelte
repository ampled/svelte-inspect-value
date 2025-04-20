<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  type Props = SvelteHTMLElements['select'] & { prefix?: string }

  let { children, onclick, value = $bindable(undefined), prefix, ...rest }: Props = $props()

  let button = $state<HTMLSelectElement>()

  export function focus() {
    button?.focus()
  }
</script>

<div class="inspect-select" class:with-prefix={prefix}>
  {#if prefix}
    <div class="prefix">{prefix}</div>
  {/if}
  <select class:prefixed={prefix != null} bind:this={button} bind:value {...rest}>
    {@render children?.()}
  </select>
</div>

<style>
  select {
    all: unset;
    z-index: 0;
  }

  select.prefixed {
    padding-left: 4ch;
  }

  :global .inspect-select option {
    font-size: 16px;
  }

  .inspect-select {
    position: relative;
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
    text-align: center;

    &.with-prefix {
      padding-left: 0;
      padding-right: 0.5em;
    }

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
    &:focus-within,
    &:focus-visible {
      background-color: var(--_button-color);
      color: var(--_background-color);
    }

    .prefix {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: var(--_background-color);
      color: var(--_button-color);
      border-right: 1px solid var(--_button-color);
      padding-inline: 0.25em;
      cursor: default;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      width: 3ch;
      text-align: center;
      /* pointer-events: none; */
      user-select: none;
      z-index: 1;
    }
  }
</style>
