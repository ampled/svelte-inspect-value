<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = {
    children?: Snippet
  } & HTMLAttributes<HTMLSpanElement>

  let { children, ...rest }: Props = $props()
</script>

<span {...rest}>
  {@render children?.()}
</span>

<style>
  span {
    font-family: var(--inspect-font);
    font-size: 0.8em;
    height: 1.5em;
    line-height: 1.5em;
    color: var(--red);
    background-color: var(--bg);
    outline: 1px solid var(--red);
    padding-inline: 0.5em;
    cursor: pointer;
    border-radius: 2px;
    transition: all 150ms ease-in-out;
    transform-origin: bottom center;
  }
</style>
