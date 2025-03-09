<script
  lang="ts"
  generics="V extends Record<KeyType, unknown> | List = Record<KeyType, unknown> | List, K extends keyof V = keyof V"
>
  import { useOptions } from '$lib/options.svelte.js'
  import type { KeyType, TypeViewProps } from '$lib/types.js'
  import { getPropertyDescriptor, getType } from '$lib/util.js'
  import { getContext, setContext } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { fly, slide } from 'svelte/transition'
  import type { List } from '../types.js'
  import GetterSetter from './GetterSetter.svelte'
  import Key from './Key.svelte'
  import Node from './Node.svelte'
  import NodeActionButton from './NodeActionButton.svelte'
  import Type from './Type.svelte'

  type PreviewProps = {
    prefix?: string
    postfix?: string
    list?: List
    keyValue?: [KeyType, unknown][]
    keys?: K[]
    value?: V
    singleValue?: unknown
    type?: TypeViewProps['type']
    startLevel?: number
    showPreview?: boolean
    path?: TypeViewProps['path']
    keyDelim?: string
    keyStyle?: HTMLButtonAttributes['style']
    showKey?: boolean
  }

  const EMPTY = Symbol('EMPTY')

  let {
    list: previewList,
    keyValue: previewKeyValue,
    keys: previewKeys,
    path,
    value,
    prefix,
    postfix,
    singleValue = EMPTY,
    showKey = true,
    keyDelim = ':',
    keyStyle = '',
    startLevel = 1,
    showPreview = false,
  }: PreviewProps = $props()

  const previewLevel = getContext<number | undefined>('preview') ?? startLevel
  const options = useOptions()
  let { previewEntries, previewDepth, showPreview: _show } = $derived(options.value)

  setContext('preview', (previewLevel ?? 0) + 1)

  let list = $derived(previewList?.slice(0, previewEntries))
  let keyValue = $derived(previewKeyValue?.slice(0, previewEntries))
  let keys = $derived(previewKeys?.slice(0, previewEntries))

  let hasMore = $derived.by(() => {
    if (list && previewList) {
      return list.length < previewList.length
    } else if (keyValue && previewKeyValue) {
      return keyValue.length < previewKeyValue.length
    } else if (keys && previewKeys) {
      return keys.length < previewKeys.length
    }
    return false
  })

  function alwaysRender(type: string) {
    return [
      'boolean',
      'string',
      'number',
      'bigint',
      'symbol',
      'regexp',
      'class',
      'undefined',
      'null',
    ].includes(type)
  }
</script>

{#if _show && previewEntries > 0 && showPreview}
  <svelte:boundary onerror={(e) => console.log('preview failed:', e)}>
    {#snippet failed(_, reset)}
      preview error. check console
      <NodeActionButton onclick={reset}>reset</NodeActionButton>
    {/snippet}
    <div
      data-testid="preview"
      class="preview"
      transition:slide={{
        axis: 'x',
        duration: options.transitionDuration,
      }}
    >
      {#if prefix}
        <span class="pre level-{previewLevel}">{prefix}</span>
      {/if}
      <div
        class="inner"
        transition:fly={{
          y: 20,
          opacity: 0,
          duration: options.transitionDuration * 2,
        }}
      >
        {#if keys && value}
          {#each keys as key, i (i)}
            {@const descriptor = getPropertyDescriptor(value, key)}
            {@render previewValue(
              key,
              false,
              descriptor
            )}{#if i < keys.length - 1}{@render comma()}{/if}
          {/each}
        {/if}
        {#if keyValue}
          {#each keyValue as [key, value], i}
            {@render valuePreview(value, key)}{#if i < keyValue.length - 1}{@render comma()}{/if}
          {/each}
        {:else if list}
          {#each list as value, i}
            {@render valuePreview(value, i)}{#if i < list.length - 1}{@render comma()}{/if}
          {/each}
        {:else if singleValue !== EMPTY}
          {@render valuePreview(singleValue, undefined)}
        {/if}
      </div>
      {#if hasMore}{@render comma()}<span class="ellipsis">&hellip;</span>{/if}
      {#if postfix}
        <span class="post level-{previewLevel}">{postfix}</span>
      {/if}
    </div>
  </svelte:boundary>
{/if}

<!-- At configured previewDepth, stop rendering nested item previews and just render their types -->
{#snippet valuePreview(value: unknown, key?: KeyType)}
  {@const valType = getType(value)}
  {#if alwaysRender(valType) || previewLevel < previewDepth}
    <Node {path} {key} {value} {showKey} {keyDelim} {keyStyle} />
  {:else}
    <div class="key-type-preview">
      {#if showKey}
        <Key disabled {path} {key} delim={keyDelim} style={keyStyle} allowUndefined />
      {/if}
      <Type type={valType} force />
    </div>
  {/if}
{/snippet}

{#snippet previewValue(key: K, _force = false, descriptor?: PropertyDescriptor)}
  {#if descriptor?.set || descriptor?.get}
    <GetterSetter {key} {descriptor} {value} {path} />
  {:else}
    {@render valuePreview(value?.[key], key)}
  {/if}
{/snippet}

{#snippet comma()}
  <span class="comma">,</span>
{/snippet}

<style>
  .comma {
    margin-left: 0;
    margin-right: 0.5em;
    color: var(--_text-color);
  }

  .ellipsis {
    color: var(--_preview-ellipsis-color);
  }

  .preview {
    font-size: var(--inspect-font-size);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    color: var(--_text-color);
    transform-origin: bottom right;
  }

  .inner {
    min-width: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .key-type-preview {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.25em;
  }

  .pre {
    margin-right: 0.25em;
  }

  .post {
    margin-left: 0.25em;
  }

  .pre,
  .post {
    /* margin-inline: 0.125em; */
    color: var(--_text-color);

    &.level-0 {
      color: var(--_comment-color);
    }
    &.level-1 {
      color: var(--_text-color);
    }
    &.level-2 {
      color: var(--cyan);
    }
    &.level-3 {
      color: var(--green);
    }
    &.level-4 {
      color: var(--orange);
    }
    &.level-5 {
      color: var(--blue);
    }
    &.level-6 {
      color: var(--yellow);
    }
    &.level-7 {
      color: var(--red);
    }
    &.level-8 {
      color: var(--cyan);
    }
    &.level-9 {
      color: var(--green);
    }
    &.level-10 {
      color: var(--orange);
    }
    &.level-11 {
      color: var(--blue);
    }
    &.level-12 {
      color: var(--yellow);
    }
    &.level-13 {
      color: var(--red);
    }
    &.level-14 {
      color: var(--cyan);
    }
    &.level-15 {
      color: var(--green);
    }
    &.level-16 {
      color: var(--orange);
    }
    &.level-17 {
      color: var(--blue);
    }
    &.level-18 {
      color: var(--yellow);
    }
    &.level-19 {
      color: var(--red);
    }
  }
</style>
