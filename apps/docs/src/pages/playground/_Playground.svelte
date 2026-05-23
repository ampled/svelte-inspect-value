<script lang="ts">
  import Inspect, { type InspectProps } from 'svelte-inspect-value'
  import Editor from '@components/editor/CodeEditor.svelte'
  import examples from './examples.js'
  import { getType } from '../../../../../packages/svelte/src/lib/util.js'
  import { globalOpts } from '@components/global-opts/globalopts.svelte'

  type Props = {
    value: string
    urlName?: string
  }

  let { value: propsValue, urlName }: Props = $props()

  let demoInputValid = $state(true)
  // svelte-ignore state_referenced_locally
  let sourceValue = $state(propsValue)
  // svelte-ignore state_referenced_locally
  let value = $state({})

  function reset() {
    sourceValue = propsValue
    onchange(sourceValue)
    editor?.setValue(propsValue)
  }

  let error = $state<string>()
  function onchange(val: string) {
    try {
      const func = new Function(val)
      value = func()
      demoInputValid = true
      error = undefined
    } catch (e) {
      if (e instanceof Error) {
        error = e.message
      }
      demoInputValid = false
    }
  }

  $effect(() => {
    onchange(propsValue)
    reset()
  })

  let valueType = $derived(getType(value))

  let props = $derived<InspectProps>({
    value,
    values: ['map', 'set', 'array', 'object'].includes(valueType) ? value : undefined,
    ...globalOpts,
  })
  let editor = $state<ReturnType<typeof Editor>>()
</script>

<details>
  <summary>
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
        d="M7.95 11.95h32m-32 12h32m-32 12h32"
      ></path>
    </svg>
    <span> Examples </span>
  </summary>
  <div class="examples-list-outer">
    <ul class="examples-list">
      {#each Object.entries(examples) as [name] (name)}
        <li>
          <a href={`/playground/${name.split(' ').join('-')}`}>{name}</a>
        </li>
      {/each}
    </ul>
  </div>
</details>

<!-- <div class="input-row">
  <label>
    examples
    <select
      value={urlName}
      onchange={(e) => {
        const value = e.currentTarget.value.split(' ').join('-')
        navigation.navigate(`/playground/${value}`)
      }}
    >
      {#each Object.entries(examples) as [name] (name)}
        <option value={name.split(' ').join('-')}>{name}</option>
      {/each}
    </select>
  </label>
</div> -->
<div class="playground not-content">
  <div class="editor">
    <button class="reset-button" onclick={() => reset()} style="float: right;">reset</button>

    <Editor
      bind:this={editor}
      style="height: 640px; min-width: 360px"
      aceOptions={{ minLines: 20, maxLines: 34, showLineNumbers: true }}
      value={sourceValue}
      onChange={onchange}
      valid={demoInputValid}
      message={error}
    />
  </div>
  <div class="inspector">
    <Inspect {...props} heading="result" style="height: 640px"></Inspect>
  </div>
</div>

<style>
  details {
    all: unset;
    summary {
      all: unset;
      display: flex;
      &::before {
        all: unset;
      }
    }
  }

  .examples-list-outer {
    position: absolute;
    z-index: 9999;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.509);
    border-radius: 8px;
    background-color: var(--sl-color-gray-6);
    padding: 1em;

    .examples-list {
      padding: 0;
      li {
        list-style-type: none;
        a {
          color: var(--sl-color-gray-1);
          text-decoration: none;
          text-transform: capitalize;
        }
      }
    }
  }

  .playground {
    display: flex;
    gap: 1rem;
    opacity: 1;
    transition: opacity 120ms ease-in;
    margin-inline: auto;
    width: 100%;
    max-width: 1280px;
    height: 100%;
  }

  .editor {
    position: relative;
    flex-basis: 50%;
    /* height: 100%; */

    .reset-button {
      position: absolute;
      right: 0.5em;
      bottom: 0.5em;
      z-index: 10;
      font-family: monospace;
    }
  }
  .inspector {
    flex-basis: 50%;
    /* height: 100%; */
  }
</style>
