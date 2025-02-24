<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    children?: Snippet
    checked?: boolean
  }

  let { children, checked = $bindable(false) }: Props = $props()
</script>

<button type="button" class:checked onclick={() => (checked = !checked)}>
  {@render children?.()}
</button>

<style>
  button {
    all: unset;
    outline: 1px solid #b4d455;
    transition: all 200ms ease-in-out;
    user-select: none;
    border-radius: 8px;
    padding: 0.25em;
    max-height: 1.6em;
    display: inline-flex;
    flex-direction: row;
    font-family: monospace;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
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
