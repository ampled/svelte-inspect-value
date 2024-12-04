<script module lang="ts">
  import hljs from 'highlight.js/lib/core'
  import xml from 'highlight.js/lib/languages/xml'
  import 'highlight.js/styles/base16/dracula.min.css'
  hljs.registerLanguage('xml', xml)
</script>

<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { onDestroy, onMount } from 'svelte'

  type Props = TypeViewProps<HTMLElement>

  let { value = undefined }: Props = $props()

  // let outer = $derived.by(() => {
  //   if (value) {
  //     let tag = innerHTML ? outerHTML.slice(0, outerHTML.indexOf(innerHTML)) : outerHTML
  //     return tag
  //   }
  //   return ''
  // })

  const getOpenTag = (ele: HTMLElement) => {
    if (ele) {
      let tag = ele.innerHTML
        ? ele.outerHTML.slice(0, ele.outerHTML.indexOf(ele.innerHTML))
        : ele.outerHTML
      return tag
    }
    return ''
  }

  const highlight = (markup: string) => hljs.highlight(markup, { language: 'xml' }).value

  let highlighted: string = $state('')

  const mutationObserver = new MutationObserver(([mutation]) => {
    console.log('mutation!', mutation)
    const outer = getOpenTag(mutation.target as HTMLElement)
    console.log(outer)
    // console.log(outer)
    highlighted = highlight(outer)
  })

  onMount(() => {
    if (value) {
      const outer = getOpenTag(value)
      highlighted = highlight(outer)
      console.log('observe!')
      mutationObserver.observe(value, { attributes: true })
    }

    return () => {
      mutationObserver.disconnect()
    }
  })

  // $effect(() => {
  //   if (value) {
  //     mutationObserver.observe(value, { attributes: true })
  //   }
  // })

  // $effect(() => {
  //   value
  //   if (outer) {
  //     highlighted = hljs.highlight(outer, { language: 'xml' }).value
  //   }
  // })

  $inspect(highlighted)
</script>

<span class="value html">{@html highlighted}</span>
