<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import { setContext } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import type { TypeViewProps } from '../types.js'
  import { getType, stringify, stringifyPath } from '../util.js'
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
  const options = useOptions()
  const keyTypes = ['string', 'number', 'symbol', 'quotedstring']
  const simpleKeys = ['bigint', 'regexp']

  // let keyType = $derived(getType(key))

  // const shouldBeQuotedRegex = /[ \-\\@//\n\r\t{}[\]()<>.,;:\p{Extended_Pictographic}]/gu
  const shouldBeQuoted = /[^A-zÀ-ú0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F_]|[\\[\]`]/

  let keyType = $derived.by(() => {
    const t = getType(key)
    if (t === 'string') {
      if ((key as string).match(shouldBeQuoted) || key === '') {
        return 'quotedstring'
      }
      return t
    }
    return t
  })

  let display = $derived.by(() => {
    if (key != null) {
      if (keyType === 'quotedstring') {
        return stringify(key, undefined, options.value.quotes)
      }
      return key.toString()
    }
    return key
  })

  let showKey = $derived(key != null)

  setContext('key', true)

  function onerror(error: unknown): void {
    throw new Error('Error in Key.svelte', { cause: error })
  }

  function onselectfdskfdsjlfkjdsflkds(
    event: Event & { currentTarget: EventTarget & HTMLSpanElement }
  ) {
    console.log(event)
  }
</script>

<svelte:boundary {onerror}>
  {#if showKey || force}
    <button
      data-testid="key"
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
        <span class="key {keyType}" onselectstart={onselectfdskfdsjlfkjdsflkds}>
          {#if keyType === 'quotedstring' && key !== ''}
            {#each display as string as char}
              {#if char === ' '}
                <span class="whitespace">&sdot;</span>
              {:else}
                {char}
              {/if}
            {/each}
          {:else}
            {display?.toString()}
          {/if}
        </span>
      {:else if simpleKeys.includes(keyType)}
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

    &:focus:not(:disabled),
    &:hover:not(:disabled) {
      .key {
        text-decoration: underline;
      }
    }
  }

  .key-button:not(:disabled) {
    cursor: pointer;
  }

  .whitespace {
    color: var(--comments);
    opacity: 0.5;
    user-select: none;
  }

  .key {
    user-select: text;
    transition: all 100ms linear;
    /* font-weight: bold; */

    &.number {
      color: var(--number);
    }

    &.string {
      color: var(--fg);
    }

    &.symbol {
      color: var(--symbol);
    }

    &.quotedstring {
      color: var(--yellow);
      text-wrap: nowrap;
      white-space: pre !important;
      white-space-collapse: preserve-spaces;
    }
  }

  .delim {
    color: var(--delimiter);
    user-select: text;
  }

  .prefix {
    color: var(--delimiter);
    margin-right: 0.5em;
    /* font-style: italic; */
    font-weight: 900;
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
