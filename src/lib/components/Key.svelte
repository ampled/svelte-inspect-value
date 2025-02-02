<script lang="ts">
  import { setContext } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { TypeViewProps } from '../types.js'
  import { getType, stringifyPath, type ValueType } from '../util.js'
  import Node from './Node.svelte'
  import Type from './Type.svelte'

  type Props = {
    prefix?: string
    key: TypeViewProps<unknown>['key'] | unknown
    force?: boolean
    path?: TypeViewProps<unknown>['path']
    delim?: string
  } & HTMLButtonAttributes

  let { key, path = [], ondblclick, delim = ':', prefix, force = false, ...rest }: Props = $props()
  const keyTypes = ['string', 'number', 'symbol']
  const simpleKeys = ['bigint', 'regexp']

  let keyType = $derived(getType(key))

  function isKeySimpleType(key: unknown, keyType: ValueType): key is bigint | RegExp {
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

  function onerror(error: unknown): void {
    throw new Error('Error in Key.svelte', { cause: error })
  }
</script>

<svelte:boundary {onerror}>
  {#if showKey || force}
    <button
      data-testid="key"
      tabindex="-1"
      class="key-button"
      {ondblclick}
      aria-label={key?.toString()}
      title={stringifyPath(path)}
      {...rest}
    >
      {#if prefix}
        <span class="prefix">{prefix}</span>
      {/if}
      {#if keyTypes.includes(keyType)}
        <span class="key {keyType}">
          {key?.toString()}
        </span>
      {:else if isKeySimpleType(key, keyType)}
        <Node value={key} />
      {:else}
        <Type type={keyType} force />
      {/if}
      {#if delim}
        <span class="delim">{delim}</span>
      {/if}
    </button>
  {/if}
</svelte:boundary>

<style>
  .key-button {
    all: unset;
    padding: 0;
    margin: 0;
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

  .prefix {
    color: var(--delimiter);
    margin-right: 0.5em;
    /* font-style: italic; */
    font-weight: 900;
  }

  button {
    cursor: default;
    background-color: transparent !important;
  }
</style>
