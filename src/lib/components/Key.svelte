<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { stringifyPath } from '$lib/util.js'
  import type { HTMLButtonAttributes } from 'svelte/elements'

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
    class="border-left"
    {ondblclick}
    onclick={() => console.log(path, stringifyPath(path))}
  >
    <span class="key {keyType}">
      {display}<span class="delim">:</span>
    </span>
  </button>
{/if}

<style>
  .border-left {
    border-left: 0px solid white;
  }

  .delim {
    color: var(--delimiter);
  }

  button {
    cursor: default;
    background-color: transparent !important;
  }
</style>
