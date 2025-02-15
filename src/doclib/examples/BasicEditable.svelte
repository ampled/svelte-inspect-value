<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { getContext } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'
  import Editor from '../Editor.svelte'
  import Stack from '../Stack.svelte'

  const original = `({ // edit me!
  id: undefined,
  firstName: 'Bob',
  lastName: 'Alice',
  email: 'bob@alice.lol',
  introduction: \`The name is Alice.\\n\\n\\t\\tBob Alice.\`,
  birthDate: new Date('1970-01-01'),
  website: new URL('https://alice.bob/?ref=abcd#about'),
  age: -42,
  emailVerified: true,
  interests: ['radio', 'tv', 'internet', 'kayaks', null],
});`

  let demoInputValid = $state(true)

  let sourceValue = $state(original)
  let value = $state(eval(original))

  function reset() {
    sourceValue = original
    value = eval(sourceValue)
    editor?.editor()?.setValue(original)
  }

  let error = $state<string>()
  function onchange(val: string) {
    try {
      const obj = eval(val)
      value = obj
      demoInputValid = true
      error = undefined
    } catch (e) {
      if (e instanceof Error) {
        // console.log(e);
        error = e.message
      }
      demoInputValid = false
    }
  }

  getContext<SvelteMap<string, string>>('toc')?.set('JSON', 'json')
  let editor = $state<ReturnType<typeof Editor>>()
</script>

<div class="flex col">
  <h3 id="json">JSON</h3>
  <p><code>Inspect</code> works well for basic object and array-values aka "json"</p>
  <button onclick={() => reset()}>reset</button>
  <Stack>
    <Inspect {value} name="demo" />
    <!-- <div> -->
    <Editor
      bind:this={editor}
      value={sourceValue}
      {onchange}
      valid={demoInputValid}
      message={error}
    />

    <!-- <textarea rows={13} class:demoInputValid bind:value={sourceValue}></textarea> -->
  </Stack>
</div>

<style>
  /* textarea {
    width: 100%;
    flex-basis: 100%;
    background-color: var(--bg);
    color: var(--fg);
    font-size: 12px;
    font-family: monospace;

    &:focus.demoInputValid {
      outline: 1px solid lightgreen;
    }

    &:focus {
      outline: 1px solid red;
    }
  } */

  .flex {
    width: 100%;
  }
</style>
