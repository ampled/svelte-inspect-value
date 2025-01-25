<script lang="ts">
  import { Inspect } from '$lib/index.js'
  import { getContext } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'
  import Code from '../Code.svelte'
  import code from './gettersandsetters.txt?raw'

  function* fibonacci() {
    let current = 1
    let next = 1
    while (true) {
      yield current
      ;[current, next] = [next, current + next]
    }
  }

  let value = $state({
    fibonacci: fibonacci(),
  })

  getContext<SvelteMap<string, string>>('toc')?.set('Iterators & Generators', 'iterators')
</script>

<div class="flex col">
  <h3 id="iterators">Iterators & Generators</h3>
  <p>
    Getters and setters render as interactive nodes as to avoid executing potential side effects
    until they are manually called.<br />
    Setters can be called with valid json input.
  </p>

  <div class="flex row" style="width: 100%">
    <Code {code} />
    <Inspect name="gettersAndSetters" style="flex-basis: 50%" {value} />
  </div>
</div>

<style>
  .flex.row {
    align-items: flex-start;
  }
</style>
