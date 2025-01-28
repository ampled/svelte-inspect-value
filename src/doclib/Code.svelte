<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { getContext, type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { fade } from 'svelte/transition'
  import { highlight } from './shiki.js'

  type CodeProps = {
    children?: Snippet
    code: string
    label?: string
    language?: 'svelte' | 'css' | 'javascript'
  } & HTMLAttributes<HTMLDivElement>

  let { code, label = 'example', language = 'svelte', children, ...rest }: CodeProps = $props()

  const multi = getContext<boolean | undefined>('multi')

  let highlighted = $derived(highlight(code, language))
</script>

<svelte:boundary>
  {#snippet failed(error, reset)}
    <Inspect value={error} />
    <button onclick={reset}>retry</button>
  {/snippet}
  <div class="code" class:multi {...rest}>
    {#if label}
      <div class="label">{label}</div>
    {/if}

    {#if children}
      {@render children()}
    {:else}
      {#await highlighted}
        ...
      {:then result}
        <div in:fade>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html result}
        </div>
      {/await}
    {/if}
  </div>
</svelte:boundary>

<style>
  .code {
    position: relative;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-code);
    font-size: 12px;
    overflow: hidden;
    padding: 1em;
  }

  .code.multi {
    border-top-left-radius: 0;

    .label {
      display: hidden;
      opacity: 0;
    }
  }

  .label {
    font-size: 14px;
    font-family: monospace;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 8px 0 8px;
    background-color: var(--bg-lighter);
    border-left: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 0.5em;
  }
</style>
