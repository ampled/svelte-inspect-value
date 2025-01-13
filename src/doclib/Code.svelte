<script lang="ts">
  import { Highlight, HighlightSvelte } from 'svelte-highlight'
  import 'svelte-highlight/styles/dracula.css'

  import css from 'svelte-highlight/languages/css'
  import javascript from 'svelte-highlight/languages/javascript'

  let { code, label = 'example', language = 'svelte', ...rest } = $props()

  let supportedLanguages = {
    javascript,
    css,
  }
</script>

<div class="code" {...rest}>
  {#if label}
    <div class="label">{label}</div>{/if}

  {#if language === 'svelte'}
    <HighlightSvelte {code} />
  {:else}
    <Highlight {code} language={supportedLanguages[language as keyof typeof supportedLanguages]} />
  {/if}
</div>

<style>
  .code {
    position: relative;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-code);
    /* padding: 1.25em; */
    font-size: 12px;
    overflow: hidden;
  }

  .label {
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
