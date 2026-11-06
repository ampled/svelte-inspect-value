<script lang="ts">
  import Inspect, { type InspectProps } from 'svelte-inspect-value'
  import CodeEditor from '@components/editor/CodeEditor.svelte'
  import examples from './examples.js'
  import { getType } from '../../../../../packages/svelte/src/lib/util.js'
  import { globalOpts } from '@components/global-opts/globalopts.svelte'
  import { tick } from 'svelte'

  type Props = {
    value: string
    urlName?: string
  }

  let { value: propsValue, urlName = 'primitives' }: Props = $props()

  let exampleName = $derived(urlName.split('-').join(' '))
  let doink = $state(false)
  let demoInputValid = $state(true)
  // svelte-ignore state_referenced_locally
  let sourceValue = $state(propsValue)
  let value = $state<any>({})

  function reset() {
    sourceValue = propsValue
    onchange(sourceValue)
    editor?.setValue(propsValue)
  }

  async function rerun() {
    value = undefined
    await tick()
    setTimeout(() => {
      value = evaluateOrReturn(sourceValue)
    }, 100)
  }

  let error = $state<string>()
  let timeout: number
  function onchange(val: string) {
    sourceValue = val
    if (timeout) {
      window.clearTimeout(timeout)
    }
    timeout = window.setTimeout(() => {
      try {
        value = evaluateOrReturn(val)
        // dodoink()
        demoInputValid = true
        error = undefined
      } catch (e) {
        value = e
        if (e instanceof Error) {
          error = e.message
        }
        demoInputValid = false
      }
    }, 500)
  }

  function evaluateOrReturn(val: string) {
    if (val.includes('return')) {
      return new Function(val)()
    } else {
      return eval(`(${val})`)
    }
  }

  $effect(() => {
    onchange(propsValue)
    // reset()
  })

  let valueType = $derived(getType(value))

  let props = $derived<InspectProps>({
    value,
    values: ['Array', 'Object'].includes(valueType) ? value : undefined,
    ...globalOpts,
    expandLevel: ['Array', 'Object'].includes(valueType) ? 0 : 1,
  })
  let editor = $state<ReturnType<typeof CodeEditor>>()

  function dodoink() {
    doink = true
    window.setTimeout(() => {
      doink = false
    }, 500)
  }
</script>

<div class="pg-container">
  <details>
    <summary>
      <svg width="24" height="24" viewBox="0 0 48 48">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          d="M7.95 11.95h32m-32 12h32m-32 12h32"
        ></path>
      </svg>
      <span>{exampleName}</span>
    </summary>
    <div class="examples-list-outer">
      <ul class="examples-list">
        {#each Object.entries(examples).filter((e) => e[0] !== exampleName) as [name] (name)}
          <li>
            <a href={`/playground/${name.split(' ').join('-')}`}>{name}</a>
          </li>
        {/each}
      </ul>
    </div>
  </details>
  <div class="playground not-content">
    <div class="editor">
      <div class="editor-buttons">
        <button onclick={rerun}>rerun</button>
        <button onclick={reset}>reset</button>
      </div>
      <div class="editor">
        <CodeEditor
          bind:this={editor}
          style="height: 100%"
          aceOptions={{
            minLines: 30,
            maxLines: 34,
            printMargin: 85,
            wrap: 'printmargin',
            scrollPastEnd: 5,
            displayIndentGuides: true,
            showPrintMargin: true,
          }}
          value={sourceValue}
          onChange={onchange}
          valid={demoInputValid}
          message={error}
        />
      </div>
    </div>
    <div class="inspector" class:doink>
      <Inspect {...props} heading="result" style="height: 100%" search="highlight"></Inspect>
    </div>
  </div>
</div>

<style>
  details {
    all: unset;
    summary {
      all: unset;
      display: flex;
      gap: 0.5em;
      cursor: pointer;
      border: 1px solid var(--docs-border-color);
      border-radius: 8px;
      background-color: var(--sl-color-gray-6);
      padding-inline: 1em;
      padding-block: 0.5em;
      width: fit-content;
      min-width: 10em;
      user-select: none;
      &::before {
        all: unset;
      }

      &:active,
      &:focus {
        background-color: var(--sl-color-gray-5);
      }

      span {
        width: 100%;
        font-weight: bold;
        text-align: center;
        text-transform: capitalize;
      }
    }
  }

  .examples-list-outer {
    position: absolute;
    z-index: 9999;
    margin: 0;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.509);
    border: 1px solid var(--docs-border-color);
    border-radius: 8px;
    background-color: var(--sl-color-gray-6);
    padding: 1em;

    .examples-list {
      padding-left: 1em;
      li {
        padding-left: 0.5em;
        list-style-type: '\203A';
        a {
          color: var(--sl-color-gray-1);
          text-decoration: none;
          text-transform: capitalize;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .pg-container {
    margin-inline: auto;
    max-width: 1280px;
  }

  .playground {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media screen and (min-width: 800px) {
    .playground {
      flex-direction: row;
    }
    .editor,
    .inspector {
      flex-basis: 50%;
      height: 640px;
    }
  }

  @keyframes doink {
    from {
      translate: 0 0;
    }
    to {
      translate: 0 1%;
    }
  }

  .inspector.doink {
    animation-duration: 100ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 2;
    animation-direction: alternate;
    animation-name: doink;
  }

  .editor {
    position: relative;
    flex-basis: 50%;

    .editor-buttons {
      display: flex;
      position: absolute;
      right: 0.5em;
      bottom: 0.5em;
      gap: 0.5em;
      z-index: 10;
      font-family: monospace;

      button {
        border: 1px solid var(--sl-color-white);
        border-radius: 2px;
        background-color: var(--sl-color-gray-6);
        color: var(--sl-color-white);
      }
    }
  }
</style>
