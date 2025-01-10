<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { TypeViewProps } from '../types.js'
  import { getType, stringifyPath } from '../util.js'
  import Type from './Type.svelte'

  type Props = {
    key: TypeViewProps<unknown>['key'] | unknown
    force?: boolean
    path?: TypeViewProps<unknown>['path']
    delim?: string
  } & HTMLButtonAttributes

  let { key, path = [], ondblclick, delim = ':', force = false }: Props = $props()

  let keyType = $derived(getType(key))

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

  let simpleKeys = ['string', 'number', 'symbol']
</script>

{#if showKey || force}
  <button
    tabindex="-1"
    class="key-button"
    {ondblclick}
    onclick={() => console.log(path, stringifyPath(path))}
  >
    {#if simpleKeys.includes(keyType)}
      <span class="key {keyType}">
        {display}
      </span>
    {:else}
      <Type type={keyType} force />
    {/if}
    <span class="delim">{delim}</span>
  </button>
{/if}

<style>
  .key-button {
    all: unset;
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .key {
    &.number {
      color: var(--number);
    }

    &.string {
      color: var(--fg);
    }

    &.symbol {
      color: var(--symbol);
    }
  }

  .delim {
    color: var(--delimiter);
  }

  button {
    cursor: default;
    background-color: transparent !important;
  }
</style>
