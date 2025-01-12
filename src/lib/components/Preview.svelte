<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import type { KeyType } from '$lib/types.js'
  import { getType } from '$lib/util.js'
  import { getContext, setContext } from 'svelte'
  import Key from './Key.svelte'
  import Node from './Node.svelte'
  import Type from './Type.svelte'

  type PreviewProps = {
    prefix?: string
    postfix?: string
    hasMore: boolean
    list?: unknown[]
    keyValue?: [KeyType, unknown][]
    map?: boolean
  }

  let { list, prefix, postfix, hasMore, keyValue, map = false }: PreviewProps = $props()

  const nestedPreview = getContext<boolean>('preview')
  let options = useOptions()

  setContext('preview', true)

  function alwaysRender(type: string) {
    return ['boolean', 'string', 'number', 'bigint', 'symbol'].includes(type)
  }
</script>

{#snippet valuePreview(value: unknown)}
  {@const valType = getType(value)}
  {#if nestedPreview && !alwaysRender(valType)}
    <Type type={valType} force />
  {:else}
    <Node {value} />
  {/if}
{/snippet}

{#snippet comma()}
  <span class="comma">,</span>
{/snippet}

{#if options.value.showPreview}
  <div class="preview">
    {#if prefix}
      <span class="pre">{prefix}</span>
    {/if}
    <div class="inner">
      {#if keyValue}
        {#each keyValue as [key, value], i}
          <div class="key-value">
            <Key {key} delim={map ? '=>' : ':'} />
            {@render valuePreview(value)}{#if i < keyValue.length - 1}{@render comma()}{/if}
          </div>
        {/each}
      {:else if list}
        {#each list as value, i}
          {@render valuePreview(value)}{#if i < list.length - 1}{@render comma()}{/if}
        {/each}
      {/if}{#if hasMore}{@render comma()}&hellip;{/if}
    </div>
    {#if postfix}
      <span class="post">{postfix}</span>
    {/if}
  </div>
{/if}

<style>
  .comma {
    margin-left: 0;
    margin-right: 0.5em;
    color: var(--fg);
  }

  .preview {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .inner {
    min-width: 0;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    gap: 0.25em;
    /* outline: 1px solid hotpink; */
  }

  .key-value {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }

  .pre {
    margin-right: 0.25em;
    color: var(--fg);
  }

  .post {
    margin-left: 0.25em;
    color: var(--fg);
  }
</style>
