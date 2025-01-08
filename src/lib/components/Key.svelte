<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { TypeViewProps } from '../types.js'
  import { stringifyPath } from '../util.js'

  type Props = {
    key: TypeViewProps<unknown>['key']
    path?: TypeViewProps<unknown>['path']
  } & HTMLButtonAttributes

  let { key, path = [], ondblclick }: Props = $props()

  let keyType = $derived(typeof key)

  let display = $derived(typeof key === 'symbol' ? key.toString() : key)

  let showKey = $derived.by(() => {
    if (key != null) {
      if (typeof key === 'string') {
        return key.length > 0
      }
      return true
    }
    return false
  })
</script>

{#if showKey}
  <button
    tabindex="-1"
    class="key-button"
    {ondblclick}
    onclick={() => console.log(path, stringifyPath(path))}
  >
    <span class="key {keyType}">
      {display}<span class="delim">:</span>
    </span>
  </button>
{/if}

<style>
  .key-button {
    all: unset;
    padding: 0;
    margin: 0;
    border: none;
  }

  .delim {
    color: var(--delimiter);
  }

  button {
    cursor: default;
    background-color: transparent !important;
  }
</style>
