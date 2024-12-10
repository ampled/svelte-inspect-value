<script module lang="ts">
  import hljs from 'highlight.js/lib/core'
  import xml from 'highlight.js/lib/languages/xml'
  hljs.configure({ classPrefix: '' })
  hljs.registerLanguage('xml', xml)
</script>

<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { onMount } from 'svelte'

  type Props = TypeViewProps<HTMLElement>

  let { value = undefined }: Props = $props()

  const getOpenTag = (ele: HTMLElement) => {
    if (ele) {
      let tag = ele.innerHTML
        ? ele.outerHTML.slice(0, ele.outerHTML.indexOf(ele.innerHTML))
        : ele.outerHTML
      return tag
    }
    return ''
  }

  function toHighlighted(ele: HTMLElement) {
    const openTag = getOpenTag(ele)
    return hljs.highlight(openTag, { language: 'xml' }).value
  }

  const highlight = (markup: string) => hljs.highlight(markup, { language: 'xml' }).value

  let highlighted: string = $state('')

  const mutationObserver = new MutationObserver(([mutation]) => {
    const outer = getOpenTag(mutation.target as HTMLElement)
    highlighted = highlight(outer)
  })

  onMount(() => {
    if (value) {
      const outer = getOpenTag(value)
      highlighted = highlight(outer)
      mutationObserver.observe(value, { attributes: true })
    }

    return () => {
      mutationObserver.disconnect()
    }
  })
</script>

<span class="value html">{@html highlighted}</span>
