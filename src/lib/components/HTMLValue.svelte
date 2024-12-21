<script module lang="ts">
  import core from 'highlight.js/lib/core'
  import xml from 'highlight.js/lib/languages/xml'

  const hljs = core.newInstance()
  hljs.configure({ classPrefix: '' })
  hljs.registerLanguage('xml', xml)
</script>

<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { onMount } from 'svelte'
  import { useOptions } from '$lib/options.svelte.js'
  import { collapseString } from '$lib/util.js'

  type Props = TypeViewProps<HTMLElement>

  let { value }: Props = $props()

  let { stringCollapse } = $derived(useOptions())

  const getOpenTag = (ele: HTMLElement, stringCollapse: number) => {
    if (ele) {
      let tag = ele.innerHTML
        ? ele.outerHTML.slice(0, ele.outerHTML.indexOf(ele.innerHTML))
        : ele.outerHTML
      return collapseString(tag, stringCollapse)
    }
    return ''
  }

  const highlight = (markup: string) => hljs.highlight(markup, { language: 'xml' }).value

  let highlighted: string = $state('')

  const mutationObserver = new MutationObserver(([mutation]) => {
    const outer = getOpenTag(mutation.target as HTMLElement, stringCollapse)
    highlighted = highlight(outer)
  })

  onMount(() => {
    if (value) {
      const outer = getOpenTag(value, stringCollapse)
      highlighted = highlight(outer)
      mutationObserver.observe(value, { attributes: true })
    }

    return () => {
      mutationObserver.disconnect()
    }
  })
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<span class="value html" title="">{@html highlighted}</span>
