<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  const original = `({
  id: undefined,
  firstName: 'Bob',
  lastName: 'Alice',
  email: 'bob@alice.lol',
  introduction: \`The name is Alice.
            Bob Alice.\`,
  birthDate: new Date(),
  website: new URL('https://alicebob.website/?ref=abcdefg#about'),
  age: -42,
  emailVerified: true,
  interests: ['radio', 'tv', 'internet', 'kayaks'],
})`

  let demoInputValid = $state(true)

  let demoObject = $state({
    id: undefined,
    firstName: 'Bob',
    lastName: 'Alice',
    email: 'bob@alice.lol',
    introduction: `The name is Alice.

    Bob Alice.`,
    birthDate: new Date(),
    website: new URL('https://alicebob.website/?ref=abcdefg#about'),
    age: -42,
    emailVerified: true,
    interests: ['radio', 'tv', 'internet', 'kayaks'],
  })

  let value = $state(original)

  function reset() {
    value = original
  }

  $effect(() => {
    try {
      const obj = eval(value)
      demoObject = obj
      demoInputValid = true
    } catch {
      demoInputValid = false
    }
  })
</script>

<div class="flex col">
  <h2>JSON</h2>
  <p>works pretty well for basic object and array-values aka "json"</p>
  <button onclick={() => reset()}>reset</button>
  <div class="flex">
    <Inspect value={demoObject} name="demo" />

    <textarea rows={14} class:demoInputValid bind:value></textarea>
  </div>
</div>

<style>
  textarea {
    width: 100%;
    flex-basis: 100%;
    outline: 1px solid red;

    &.demoInputValid {
      outline: 1px solid lightgreen;
    }
  }

  .flex {
    width: 100%;
  }
</style>
