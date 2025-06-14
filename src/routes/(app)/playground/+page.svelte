<script lang="ts">
  import Editor from '$doclib/Editor.svelte'
  import Inspect from '$lib/Inspect.svelte'
  import type { InspectProps } from '$lib/types.js'
  import { getType } from '$lib/util.js'
  import examples from './examples.js'

  let original = $state(examples.primitives)

  let demoInputValid = $state(true)

  // svelte-ignore state_referenced_locally
  let sourceValue = $state(original)
  let value = $state({ name: 'Dinky Doodlebop', age: 42 })

  let valueType = $derived(getType(value))

  let props = $derived<InspectProps>({
    value,
    values: ['map', 'set', 'array', 'object'].includes(valueType) ? value : undefined,
  })

  function reset() {
    sourceValue = original
    onchange(sourceValue)

    editor?.editor()?.setValue(original)
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

  let editor = $state<ReturnType<typeof Editor>>()

  onchange(examples.primitives)
</script>

<h2>Playground</h2>

<div class="flex col">
  <div class="flex row align-end justify-between w-max">
    <button onclick={() => reset()}>reset</button>
    <label>
      examples
      <select
        bind:value={sourceValue}
        onchange={() => {
          original = sourceValue
          onchange(sourceValue)
        }}
      >
        {#each Object.entries(examples) as [name, value] (name)}
          <option {value}>{name}</option>
        {/each}
      </select>
    </label>
  </div>
  <div class="playground">
    <Editor
      bind:this={editor}
      value={sourceValue}
      {onchange}
      valid={demoInputValid}
      message={error}
    />
    <Inspect {...props} name="demo" expandLevel={0} heading="playground" />
  </div>
</div>

<style>
  .playground {
    display: flex;
    align-items: flex-start;
    gap: 0.5em;
    width: 100%;
  }
</style>
