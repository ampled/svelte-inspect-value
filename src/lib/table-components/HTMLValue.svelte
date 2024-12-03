<script module lang="ts">
  import hljs from 'highlight.js/lib/core'
  import xml from 'highlight.js/lib/languages/xml'
  import 'highlight.js/styles/base16/dracula.min.css'
  hljs.registerLanguage('xml', xml)
</script>

<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'

  type Props = TypeViewProps<HTMLElement>

  let { value = undefined }: Props = $props()

  let outer = $derived.by(() => {
    if (value) {
      let tag = value.innerHTML
        ? value.outerHTML.slice(0, value.outerHTML.indexOf(value.innerHTML))
        : value.outerHTML
      return tag
    }
    return ''
  })

  let highlighted = $derived(hljs.highlight(outer, { language: 'xml' }).value)

  $inspect(highlighted)

  // let collapsed = $state(true)
</script>

<span class="value">{@html highlighted}</span>
