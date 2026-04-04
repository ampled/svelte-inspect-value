<script lang="ts" generics="TKey extends keyof InspectOptions">
  import type { Snippet } from 'svelte'
  import type { InspectOptions } from 'svelte-inspect-value'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { globalOpts } from './globalopts.svelte'

  type Props = {
    children?: Snippet
    key: TKey
  } & SvelteHTMLElements['button']

  let { children, key, ...rest }: Props = $props()

  let checked = $derived(Boolean(globalOpts[key]))

  function onclick() {
    if (typeof globalOpts[key] === 'boolean' && key in globalOpts) {
      // @ts-expect-error asdf
      globalOpts[key] = !globalOpts[key]
    }
  }
</script>

<button type="button" class:checked {onclick} {...rest}>
  {@render children?.()}
</button>

<style>
  button {
    all: unset;
    transition: all 200ms ease-in-out;
    cursor: pointer;
    margin-bottom: 2px;
    outline: 1px solid var(--sl-color-accent-high);
    border-radius: 8px;
    padding-inline: 0.5em;
    padding-block: 0.25em;
    max-height: 1.6em;
    color: var(--sl-color-white);
    font-size: 10px;
    line-height: 1;
    font-family: monospace;
    user-select: none;
    text-align: center;
    white-space: nowrap;
  }

  button:focus {
    outline: 1px solid var(--sl-color-accent-low);
    outline-offset: 2px;
  }

  button:hover:not(.checked) {
    background-color: transparent;
    color: white;
  }

  button.checked {
    background-color: var(--sl-color-accent-high);
    color: var(--sl-color-black);
  }
</style>
