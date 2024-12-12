<script>
  import hljs from 'highlight.js/lib/core'
  import xml from 'highlight.js/lib/languages/xml'
  import javascript from 'highlight.js/lib/languages/javascript'
  // import svelte from 'highlight.js/lib/languages/svelte'
  import 'highlight.js/styles/base16/dracula.min.css'

  const instance = hljs.newInstance()
  // hljs.configure({ classPrefix: '' })
  instance.registerLanguage('xml', xml)
  instance.registerLanguage('javascript', javascript)

  let { code } = $props()

  let highlighted = $derived(instance.highlight(code, { language: 'xml' }))
</script>

<pre class="hljs">{@html highlighted.value}<div class="label">example</div>
</pre>

<style>
  pre {
    position: relative;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-code);
    padding: 1.25em;
    font-size: 12px;
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
