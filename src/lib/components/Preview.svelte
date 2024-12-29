<script lang="ts" generics="T = unknown">
  import type { Snippet } from 'svelte'

  type Props = {
    list: T[]
    item: Snippet<[item: T, index: number]>
    prefix?: string
    postfix?: string
    hasMore: boolean
  }

  let { list, item, prefix, postfix, hasMore }: Props = $props()
</script>

{#snippet comma()}
  <span class="comma">,</span>
{/snippet}

<div class="preview">
  {#if prefix}
    <span class="pre">{prefix}</span>
  {/if}
  {#each list as val, i (i)}
    {@render item(val, i)}{#if i < list.length - 1}{@render comma()}{/if}
  {/each}{#if hasMore}{@render comma()}&hellip;{/if}
  {#if postfix}
    <span class="post">{postfix}</span>
  {/if}
</div>

<style>
  .comma {
    margin-left: 0;
    margin-right: 0.5em;
  }

  .preview {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 100%;
  }

  .pre {
    margin-right: 0.5em;
  }

  .post {
    margin-left: 0.5em;
  }
</style>
