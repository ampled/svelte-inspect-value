<script lang="ts">
  import type { Snippet } from 'svelte'
  import { slide } from 'svelte/transition'

  type Props = {
    children?: Snippet
    checked?: boolean
  }

  let { children, checked = $bindable(false) }: Props = $props()
</script>

<button
  transition:slide={{ axis: 'x' }}
  type="button"
  class:checked
  onclick={() => (checked = !checked)}
>
  {@render children?.()}
</button>

<style>
  button {
    all: unset;
    display: inline-flex;
    flex-direction: row;
    transition: all 200ms ease-in-out;
    cursor: pointer;
    outline: 1px solid #b4d455;
    border-radius: 8px;
    padding: 0.25em;
    max-height: 1.6em;
    font-size: 10px;
    line-height: 1;
    font-family: monospace;
    user-select: none;
    white-space: nowrap;
  }

  button:focus {
    outline: 1px solid lightblue;
    outline-offset: 2px;
  }

  button:hover:not(.checked) {
    background-color: transparent;
    color: white;
  }

  button.checked {
    background-color: #b4d455;
    color: black;
  }
</style>
