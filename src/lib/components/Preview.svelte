<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import type { KeyName } from '$lib/types.js'
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
    keyValue?: [KeyName, unknown][]
  }

  let { list, prefix, postfix, hasMore, keyValue }: PreviewProps = $props()

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

{#if options.value.showPreview}
  {#snippet comma()}
    <span class="comma">,</span>
  {/snippet}

  <div class="preview" class:nested-preview={nestedPreview}>
    {#if prefix}
      <span class="pre">{prefix}</span>
    {/if}

    {#if keyValue}
      {#each keyValue as [key, value], i}
        <Key {key} />
        {@render valuePreview(value)}{#if i < keyValue.length - 1}{@render comma()}{/if}
      {/each}
    {:else if list}
      {#each list as value, i}
        {@render valuePreview(value)}{#if i < list.length - 1}{@render comma()}{/if}
      {/each}
    {/if}{#if hasMore}{@render comma()}&hellip;{/if}
    {#if postfix}
      <span class="post">{postfix}</span>
    {/if}
  </div>
{/if}

<style>
  .comma {
    margin-left: 0;
    margin-right: 0.5em;
  }

  .preview {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    text-overflow: ellipsis;
    /* max-width: 50%; */
    overflow: hidden;
    opacity: 0.8;
  }

  /* .preview :global(span) {
    text-overflow: ellipsis;
    overflow: hidden;
  } */

  .preview.nested-preview {
    opacity: 1;
    max-width: 100%;
  }

  /* .isPreviewAlready {
    background-color: hotpink;
  } */

  .pre {
    margin-right: 0.25em;
    color: var(--cyan);
  }

  .post {
    margin-left: 0.25em;
    color: var(--cyan);
  }
</style>
