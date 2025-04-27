<script lang="ts">
  import { setContext } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { getPreviewLevel } from '../contexts.js'
  import { useOptions } from '../options.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import { getType, stringify, stringifyPath } from '../util.js'
  import Node from './Node.svelte'
  import Type from './Type.svelte'

  type Props = {
    prefix?: string
    key: TypeViewProps<unknown>['key'] | unknown
    path?: TypeViewProps<unknown>['path']
    delim?: string
    allowUndefined?: boolean
  } & HTMLButtonAttributes

  let { key, path = [], delim = ':', prefix, disabled, onclick, ...rest }: Props = $props()
  const options = useOptions()
  const keyTypes = ['string', 'number', 'symbol', 'quotedstring']
  const simpleKeys = ['bigint', 'regexp']
  const ele = $derived<'span' | 'button'>(disabled ? 'span' : 'button')

  const shouldBeQuoted = /[^A-zÀ-ú0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F_$]|[\\[\]`]/
  const previewLevel = getPreviewLevel()

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

  let shouldShow = $derived(key === undefined ? previewLevel > 0 : true)

  setContext(Symbol.for('siv.key'), true)

  function onerror(error: unknown): void {
    throw new Error('Error in Key.svelte', { cause: error })
  }

  function handleClick(e: MouseEvent & { currentTarget: HTMLButtonElement }) {
    if (disabled) return
    onclick?.(e)
  }
</script>

{#if shouldShow}
  <svelte:boundary {onerror}>
    <div class="key-outer">
      <svelte:element
        this={ele}
        data-testid="key"
        type={ele === 'button' ? 'button' : undefined}
        class={['key-button', disabled && 'disabled']}
        {disabled}
        aria-label={key?.toString()}
        title={previewLevel === 0 ? stringifyPath(path) : undefined}
        onclick={handleClick}
        {...rest}
      >
        {#if prefix}
          <span class="prefix">{prefix}</span>
        {/if}
        {#if keyTypes.includes(keyType)}
          <span class="key {keyType}">
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
      </svelte:element>
      {#if delim}
        <span class="delim">{delim}</span>
      {/if}
    </div>
  </svelte:boundary>
{/if}

<style>
  .key-outer {
    display: flex;
  }

  .key-button {
    all: unset;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;

    &:focus:not(.disabled),
    &:hover:not(.disabled) {
      .key {
        text-decoration: underline;
      }
    }
  }

  .key-button:not(.disabled) {
    cursor: pointer;
  }

  .whitespace {
    color: var(--_key-whitespace-color);
    opacity: var(--_key-whitespace-opacity);
    user-select: none;
  }

  .key {
    user-select: text;
    transition: all 100ms linear;
    /* font-weight: bold; */

    &.number {
      color: var(--_number-value-color);
    }

    &.string {
      color: var(--_text-color);
    }

    &.symbol {
      color: var(--_symbol-value-color);
    }

    &.quotedstring {
      color: var(--_string-value-color);
      text-wrap: nowrap;
      white-space: pre !important;
      white-space-collapse: preserve-spaces;
    }
  }

  .delim {
    color: var(--_delimiter-color);
    user-select: text;
  }

  .prefix {
    color: var(--_key-prefix-color);
    font-weight: 900;
  }

  button {
    cursor: default;
    background-color: transparent !important;
  }
</style>
