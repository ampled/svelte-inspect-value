<script module lang="ts">
  import ace from 'ace-builds'
  import jsWorker from 'ace-builds/src-noconflict/worker-javascript.js?url'

  ace.config.set('basePath', '../../../node_modules/ace-builds/src-noconflict')
  ace.config.setModuleUrl('ace/mode/javascript_worker', jsWorker)

  import 'ace-builds/src-noconflict/mode-javascript'
  import { inspectTheme, inspectThemeLight } from './ace-inspect-theme'

  const ACE_DEFAULTS: Partial<ace.Ace.EditorOptions> = {
    maxLines: 100,
    minLines: 12,
    showLineNumbers: false,
    showFoldWidgets: false,
    showPrintMargin: false,
    showGutter: false,
    highlightActiveLine: false,
  }
</script>

<script lang="ts">
  import { starlightTheme } from '../global-opts/sltheme.svelte.js'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { onMount } from 'svelte'

  type AceProps = {
    value: string
    valid?: boolean
    onChange?: (value: string) => void
    message?: string
    aceOptions?: Partial<ace.Ace.EditorOptions>
  } & SvelteHTMLElements['div']

  let { value, onChange, valid, message, aceOptions = {}, ...rest }: AceProps = $props()
  let aceOpts = $derived<Partial<ace.Ace.EditorOptions>>({ ...ACE_DEFAULTS, ...aceOptions })
  let div = $state<HTMLDivElement>()
  let editor = $state<ace.Editor>()
  let ready = $state(false)

  export function setValue(value: string) {
    editor?.setValue(value, -1)
  }

  onMount(() => {
    if (div) {
      editor = ace.edit(div)
      editor.setTheme(inspectTheme)
      editor.session.setMode('ace/mode/javascript')
      editor.setValue(value, -1)
      editor.setOptions(aceOpts)
      editor.container.style.lineHeight = '1.5'
      editor.container.style.fontFamily = 'monospace'

      editor.renderer.updateFull(true)

      editor.session.on('change', () => {
        const val = editor?.getValue()
        if (val && onChange) {
          onChange(val)
        }
      })

      ready = true
    }

    return () => {
      editor?.destroy()
    }
  })

  $effect(() => {
    if (editor && starlightTheme.current) {
      if (starlightTheme.current === 'light') {
        editor.setTheme(inspectThemeLight)
      } else {
        editor.setTheme(inspectTheme)
      }
    }
  })
</script>

<svelte:head>
  <link rel="stylesheet" href="/ace.css" />
</svelte:head>

<div class="wrapper not-content" class:valid {...rest}>
  <div class="ace" class:ready bind:this={div}></div>
  {#if message}
    <span>
      {message}
    </span>
  {/if}
</div>

<style>
  .wrapper {
    /* all: unset; */
    position: relative;
    box-shadow: 0.1rem 0.1rem 0.2rem #00000028;
    border: 1px solid var(--docs-border-color);
    border-radius: 8px;
    background-color: var(--base00);
    padding: 0.5em;
    width: 100%;
    min-height: 252px;
    overflow: hidden;
  }

  .wrapper:focus-within {
    border-color: var(--red);

    &.valid {
      border-color: var(--green);
    }
  }

  .ace {
    opacity: 0;
    transition: opacity 50ms ease-in;
    width: 100%;
    height: auto;
    min-height: 208px;

    &.ready {
      opacity: 1;
    }
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
    font-family: monospace;
  }
</style>
