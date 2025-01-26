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

  let list = $derived(previewList?.slice(0, options.value.previewEntries))
  let keyValue = $derived(previewKeyValue?.slice(0, options.value.previewEntries))
  let keys = $derived(previewKeys?.slice(0, options.value.previewEntries))

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

  setContext('preview', (previewLevel ?? 0) + 1)

  function alwaysRender(type: string) {
    return ['boolean', 'string', 'number', 'bigint', 'symbol', 'regexp', 'class'].includes(type)
  }
</script>

<!-- At configured previewDepth, stop rendering nested item previews and just render their types -->
{#snippet valuePreview(value: unknown, key?: KeyType)}
  {@const valType = getType(value)}
  {#if alwaysRender(valType) || previewLevel < options.value.previewDepth}
    <Node {path} {key} {value} {showKey} {keyDelim} {keyStyle} />
  {:else}
    <div class="key-type-preview">
      {#if showKey}
        <Key {path} {key} delim={keyDelim} style={keyStyle} />
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

<svelte:boundary onerror={(e) => console.log('preview failed:', e)}>
  {#snippet failed(_, reset)}
    preview error. check console <NodeActionButton onclick={reset}>reset</NodeActionButton>
  {/snippet}
  {#if options.value.showPreview && options.value.previewEntries > 0 && showPreview}
    <div
      data-testid="preview"
      class="preview"
      transition:slide={{
        axis: 'x',
        duration: options.value.noanimate ? 0 : 400,
      }}
    >
      {#if prefix}
        <span class="pre level-{previewLevel}">{prefix}</span>
      {/if}
      <div
        class="inner"
        transition:fly={{
          y: 20,
          opacity: 1,
          duration: options.value.noanimate ? 0 : 400,
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
  {/if}
</svelte:boundary>

<style>
  .comma {
    margin-left: 0;
    margin-right: 0.25em;
    color: var(--fg);
  }

  .ellipsis {
    color: var(--comments);
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
    color: var(--fg);
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
    color: var(--fg);

    &.level-0 {
      color: var(--comments);
    }

    &.level-1 {
      color: var(--fg);
    }
    &.level-2 {
      color: var(--green);
    }
    &.level-3 {
      color: var(--cyan);
    }
    &.level-4 {
      color: var(--red);
    }
    &.level-5 {
      color: var(--green);
    }
    &.level-6 {
      color: var(--fg);
    }
    &.level-7 {
      color: var(--red);
    }
    &.level-8 {
      color: var(--orange);
    }
    &.level-9 {
      color: var(--yellow);
    }
    &.level-10 {
      color: var(--green);
    }
  }
</style>
