<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { getContext } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'

  getContext<SvelteMap<string, string>>('toc')?.set('Functions', 'functions')

  const arrowFunction = eval(`(num) => num * 2`)
  const someFunction = eval(`(function someFunction(some, thing) {
        if (!some) return thing
        const obj = {
          some: thing,
          thing: some,
          [Symbol('oh')]: 'doodle',
        }

        try {
          Math.random()
        } catch {
          const { log } = console
          log('oh no')
          log(obj)
        }
        return some + ' ' + thing
      })`)
</script>

<div class="flex col">
  <h3 id="functions">Functions</h3>
  <p>Display bodies of functions with <code>hljs</code> syntax highlighting.</p>

  <Inspect
    name="functions"
    value={{
      arrowFunction,
      someFunction,
    }}
  />
</div>
