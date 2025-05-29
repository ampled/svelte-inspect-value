<script lang="ts">
  import Editor from '$doclib/Editor.svelte'
  import Inspect from '$lib/Inspect.svelte'

  const original = `({ // edit me!
  aString: 'hello',
  aMultiLineString: 'h\\n e\\n  l\\n   l\\n    o'
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
        error = e.message
      }
      demoInputValid = false
    }
  }

  let editor = $state<ReturnType<typeof Editor>>()
</script>

<h2>Playground</h2>

<div class="flex col">
  <button onclick={() => reset()}>reset</button>
  <div class="playground">
    <Editor
      bind:this={editor}
      value={sourceValue}
      {onchange}
      valid={demoInputValid}
      message={error}
    />
    <Inspect {value} name="demo" />
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
