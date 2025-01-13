<script lang="ts">
  import { setContext } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { TypeViewProps } from '../types.js'
  import { getType, stringifyPath, type ValueType } from '../util.js'
  import Node from './Node.svelte'
  import Type from './Type.svelte'

  type Props = {
    key: TypeViewProps<unknown>['key'] | unknown
    force?: boolean
    path?: TypeViewProps<unknown>['path']
    delim?: string
  } & HTMLButtonAttributes

  let { key, path = [], ondblclick, delim = ':', force = false, ...rest }: Props = $props()

  const simpleKeys = ['string', 'number', 'symbol', 'bigint', 'regexp']

  let keyType = $derived(getType(key))

  function isKeySimpleType(
    key: unknown,
    keyType: ValueType
  ): key is string | number | symbol | bigint | RegExp {
    return simpleKeys.includes(keyType)
  }

  let showKey = $derived.by(() => {
    if (key != null) {
      if (typeof key === 'string') {
        return key.length > 0
      }
      return true
    }
    return false
  })

  setContext('key', true)
</script>

{#if showKey || force}
  <button tabindex="-1" class="key-button" {ondblclick} title={stringifyPath(path)} {...rest}>
    {#if keyType === 'string'}
      <span class="key {keyType}">
        {(key as string).toString()}
      </span>
    {:else if isKeySimpleType(key, keyType)}
      <Node value={key} />
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
