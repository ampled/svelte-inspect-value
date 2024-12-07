<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { stringifyPath } from '$lib/util.js'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type Props = {
    key: TypeViewProps<any>['key']
    path?: TypeViewProps<any>['path']
  } & HTMLButtonAttributes

  let { key, path = [], ondblclick }: Props = $props()

  let keyType = $derived(typeof key)

  let display = $derived(typeof key === 'symbol' ? key.toString() : key)
</script>

{#if key !== null && key !== undefined}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <button class="border-left" {ondblclick} onclick={() => console.log(path, stringifyPath(path))}>
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
  }
</style>
