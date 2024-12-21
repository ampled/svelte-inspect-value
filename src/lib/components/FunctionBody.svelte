<script module lang="ts">
  import core from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'

  const hljs = core.newInstance()
  hljs.configure({ classPrefix: '' })
  hljs.registerLanguage('javascript', javascript)
</script>

<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { stringify } from '$lib/util.js'

  // import { onMount } from 'svelte'
  // import { useOptions } from '$lib/options.svelte.js'
  // import { collapseString } from '$lib/util.js'

  type Props = TypeViewProps<string>

  let { value }: Props = $props()

  // let { stringCollapse } = $derived(useOptions())

  // const getOpenTag = (ele: HTMLElement, stringCollapse: number) => {
  //   if (ele) {
  //     let tag = ele.innerHTML
  //       ? ele.outerHTML.slice(0, ele.outerHTML.indexOf(ele.innerHTML))
  //       : ele.outerHTML
  //     return collapseString(tag, stringCollapse)
  //   }
  //   return ''
  // }

  const highlight = (markup: string) => hljs.highlight(markup, { language: 'javascript' }).value

  let highlighted: string = $derived(highlight(value.replaceAll('\t', ' ')))

  $inspect('body:', stringify(value))
  $inspect('highlighted:', highlighted)
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<pre class="value function hl" title={value}><code>{@html highlighted}</code></pre>
