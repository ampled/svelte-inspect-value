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
    transform-origin: bottom center;
    cursor: pointer;
    outline: 1px solid var(--_button-color);
    border-radius: 2px;
    background-color: var(--_background-color);
    padding-inline: 0.5em;
    min-width: 64px;
    height: 1.5em;
    color: var(--_button-color);
    font-size: 0.8em;
    line-height: 1.5em;
    font-family: var(--inspect-font);
    text-align: center;

    &.with-prefix {
      padding-right: 0.5em;
      padding-left: 0;
    }

    &:disabled {
      cursor: default;
      outline-color: var(--_button-disabled-color);
      color: var(--_button-disabled-color);
    }

    &:active:not(:disabled) {
      transform: scaleY(0.85);
      outline: 1px solid var(--_button-color);
      background-color: var(--_background-color);
      color: var(--_button-color);
    }

    &:hover:not(:disabled):not(:active),
    &:focus-within,
    &:focus-visible {
      background-color: var(--_button-color);
      color: var(--_background-color);
    }

    .prefix {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      cursor: default;
      border-right: 1px solid var(--_button-color);
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      background-color: var(--_background-color);
      padding-inline: 0.25em;
      width: 3ch;
      color: var(--_button-color);
      user-select: none;
      text-align: center;
    }
  }
</style>
