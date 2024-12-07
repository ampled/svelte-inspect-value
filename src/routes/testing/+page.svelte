<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'

  let comp = $state()

  let timer = 0
  $effect(() => {
    const interval = window.setInterval(() => {
      anObject.counter++
    }, 1000)

    return () => window.clearInterval(interval)
  })

  let growing = $state<number[]>([])

  let promises = $state({})

  const generator = function* () {
    let i = 0
    while (true) {
      yield i++
    }
  }

  onMount(() => {
    promises = {
      neverResolve: new Promise(() => {}),
      resolveInAFew: new Promise((resolve) => {
        setTimeout(() => {
          resolve('yeah')
        }, 2000)
      }),
      rejectsInAFew: new Promise((_, reject) => {
        setTimeout(() => {
          reject('nope')
        }, 3500)
      }),
    }
  })

  let typedArr = $state(new Int16Array(3))

  let anObject = $state({
    aString: 'some string',
    counter: 0,
    anIterator: [1, 2, 3].values(),
    generator,
  })
</script>

<input type="text" bind:value={anObject.aString} />
<input type="number" bind:value={anObject.counter} />
<button onclick={() => (growing = [...growing, growing.length + 1])}>+</button>
<button onclick={() => (growing = growing.toSpliced(growing.length - 1, 1))}>-</button>

<Inspect class="dracula" value={anObject} />

<Inspect class="default-dark" value={promises} name="promises" />
<Inspect class="dracula" value={typedArr} name="typedArr" />

<Inspect value={{ component: comp }} class="dracula" />

<Inspect bind:this={comp} class="monokai" value={anObject.aString} />

<Inspect class="dracula" name="growing" value={growing} />

<Inspect
  class="dracula"
  name="nestedArrays"
  value={[
    0,
    1,
    2,
    3,
    [4, 5, [6, 7, 8], [9, 10, 11], { bing: 'bang', a: { boogie: { lol: 'lol' } } }],
  ]}
/>
