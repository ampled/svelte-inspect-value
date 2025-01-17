<script module lang="ts">
  import core from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  const hljs = core.newInstance()
  hljs.configure({ classPrefix: '' })
  hljs.registerLanguage('javascript', javascript)
</script>

<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import { collapseString } from '$lib/util.js'

  type Props = TypeViewProps<string> & { inline?: boolean }

  let { value, inline = false }: Props = $props()

  let options = useOptions()

  const highlight = (markup: string, stringCollapse: number) =>
    hljs.highlight(collapseString(markup, stringCollapse), { language: 'javascript' }).value

  let highlighted: string = $derived(
    highlight(value.replaceAll('\t', ' '), options.value.stringCollapse)
  )
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<code data-testid="value" title={value} class:inline class="value function hl"
  >{@html highlighted}</code
>

<style>
  code.value.function.hl.inline {
    display: inline;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :global code.value.function.hl {
    background-color: unset;
    color: var(--fg) !important;
    white-space: pre;
    padding: var(--indent);
    padding-left: calc(var(--indent) * 2);

    .title.function_ {
      color: var(--function);
    }

    .title.class_ {
      color: var(--class);
    }

    .tag {
      color: var(--fg);
    }

    .keyword {
      color: var(--red);
    }

    .name {
      color: var(--red);
    }

    .attr {
      color: var(--green);
    }

    .number {
      color: var(--purple);
    }

    .string {
      color: var(--yellow);
    }
  }
</style>
