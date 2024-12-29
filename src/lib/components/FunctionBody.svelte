<script module lang="ts">
  import core from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  const hljs = core.newInstance()
  hljs.configure({ classPrefix: '' })
  hljs.registerLanguage('javascript', javascript)
</script>

<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'

  type Props = TypeViewProps<string> & { inline?: boolean }

  let { value, inline = false }: Props = $props()

  const highlight = (markup: string) => hljs.highlight(markup, { language: 'javascript' }).value

  let highlighted: string = $derived(highlight(value.replaceAll('\t', ' ')))
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<code class:inline class="value function hl">{@html highlighted}</code>

<style>
  code.value.function.hl.inline {
    display: inline;
    padding: 0;
    white-space: nowrap;
  }
</style>
