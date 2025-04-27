<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    children?: Snippet
  } & HTMLAttributes<HTMLSpanElement>

  let { children, ...rest }: Props = $props()
</script>

<span data-testid="note" {...rest}>
  {@render children?.()}
</span>

<style>
  span {
    font-family: var(--inspect-font);
    font-size: 0.8em;
    height: 1.5em;
    line-height: 1.5em;
    color: var(--_note-color);
    background-color: var(--_background-color);
    outline: 1px solid var(--_note-color);
    padding-inline: 0.5em;
    cursor: help;
    border-radius: 2px;
    transition:
      color 150ms ease-in-out,
      background-color 150ms ease-in out;
    transform-origin: bottom center;
  }
</style>
