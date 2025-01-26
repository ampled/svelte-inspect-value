<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  import { Highlight, HighlightSvelte } from 'svelte-highlight'
  import './code.css'
  // import github from 'svelte-highlight/styles/horizon-dark'

  import Inspect from '$lib/Inspect.svelte'
  import { getContext, type Snippet } from 'svelte'
  import css from 'svelte-highlight/languages/css'
  import javascript from 'svelte-highlight/languages/javascript'

  type CodeProps = {
    children?: Snippet
    code: string
    label?: string
    language?: 'svelte' | 'xml' | 'css' | 'javascript'
  } & HTMLAttributes<HTMLDivElement>

  let { code, label = 'example', language = 'svelte', children, ...rest }: CodeProps = $props()

  let supportedLanguages = {
    javascript,
    css,
  }

  const multi = getContext<boolean | undefined>('multi')
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
    {:else if language === 'svelte'}
      <HighlightSvelte {code}></HighlightSvelte>
    {:else}
      <Highlight
        {code}
        language={supportedLanguages[language as keyof typeof supportedLanguages]}
      />
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
  }

  .code.multi {
    border-top-left-radius: 0;

    .label {
      display: hidden;
      opacity: 0;
    }
  }

  .label {
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
