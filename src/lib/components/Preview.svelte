<script
  lang="ts"
  generics="V extends Record<KeyType, unknown> | List = Record<KeyType, unknown> | List, K extends keyof V = keyof V"
>
  import { useOptions } from '$lib/options.svelte.js'
  import type { KeyType } from '$lib/types.js'
  import { descriptorPrefix, getType } from '$lib/util.js'
  import { getContext, setContext } from 'svelte'
  import { fly, slide } from 'svelte/transition'
  import type { List } from '../types.js'
  import Key from './Key.svelte'
  import Node from './Node.svelte'
  import Type from './Type.svelte'

  type PreviewProps = {
    prefix?: string
    postfix?: string
    hasMore: boolean
    list?: List
    keyValue?: [KeyType, unknown][]
    keys?: K[]
    value?: V
    singleValue?: unknown
    map?: boolean
    startLevel?: number
    showPreview?: boolean
  }

  const EMPTY = Symbol('EMPTY')

  let {
    list,
    prefix,
    postfix,
    hasMore,
    keyValue,
    singleValue = EMPTY,
    keys,
    value,
    startLevel = 1,
    showPreview = false,
    map = false,
  }: PreviewProps = $props()

  const previewLevel = getContext<number | undefined>('preview') ?? startLevel
  let options = useOptions()

  setContext('preview', (previewLevel ?? 0) + 1)

  function alwaysRender(type: string) {
    return ['boolean', 'string', 'number', 'bigint', 'symbol', 'regexp'].includes(type)
  }
</script>

<!-- At configured previewDepth, stop rendering nested item previews and just render their types -->
{#snippet valuePreview(value: unknown, force = false)}
  {@const valType = getType(value)}
  {#if alwaysRender(valType) || previewLevel < options.value.previewDepth || force}
    <Node {value} />
  {:else}
    <Type type={valType} force />
  {/if}
{/snippet}

{#snippet previewValue(key: K, _force = false)}
  {@const valType = getType(value)}
  {#if valType === 'object'}
    {@const descriptor = Object.getOwnPropertyDescriptor(value, key)}
    {#if descriptor?.get || descriptor?.set}
      <!-- <Getter {descriptor} value={value as Record<string, unknown>} /> -->
    {:else}
      {@render valuePreview(value?.[key])}
    {/if}
  {/if}

  <!-- {#if alwaysRender(valType) || previewLevel < options.value.previewDepth || force}
    <Node {value} />
  {:else}
    <Type type={valType} force />
  {/if} -->
{/snippet}

{#snippet comma()}
  <span class="comma">,</span>
{/snippet}

{#if options.value.showPreview && showPreview}
  <div
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
          {@const descriptor = Object.getOwnPropertyDescriptor(value, key)}
          <div class="key-value">
            <Key
              prefix={descriptorPrefix(descriptor)}
              {key}
              delim={map ? '=>' : descriptor?.get || descriptor?.set ? '' : ':'}
              style={map ? 'gap: 0.25em' : ''}
            />
            {@render previewValue(key)}
          </div>
          {#if i < keys.length - 1}{@render comma()}{/if}
        {/each}
      {/if}
      {#if keyValue}
        {#each keyValue as [key, value], i}
          <div class="key-value">
            <Key {key} delim={map ? '=>' : ':'} style={map ? 'gap: 0.25em' : ''} />
            {@render valuePreview(value)}
          </div>
          {#if i < keyValue.length - 1}{@render comma()}{/if}
        {/each}
      {:else if list}
        {#each list as value, i}
          {@render valuePreview(value)}{#if i < list.length - 1}{@render comma()}{/if}
        {/each}
      {:else if singleValue !== EMPTY}
        {@render valuePreview(singleValue, false)}
      {/if}

      {#if hasMore}{@render comma()}<span class="ellipsis">&hellip;</span>{/if}
    </div>
    {#if postfix}
      <span class="post level-{previewLevel}">{postfix}</span>
    {/if}
  </div>
{/if}

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

  .key-value {
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
