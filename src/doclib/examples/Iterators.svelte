<script lang="ts">
  import { Inspect } from '$lib/index.js'
  import { getContext } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'
  import Code from '../Code.svelte'
  import Stack from '../Stack.svelte'
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
    array: [1, 2, 3, 4].values(),
    set: new Set([12, 34, 45]).values(),
    map: new Map<unknown, unknown>([
      [0, 0],
      [{ id: 123 }, 1],
      [[1, 2, 3], 2],
      [Symbol('key'), 'value'],
      [
        Promise.resolve('foo'),
        {
          get something() {
            return 'something'
          },
        },
      ],
    ]).entries(),
  })

  getContext<SvelteMap<string, string>>('toc')?.set('Iterators & Generators', 'iterators')
</script>

<div class="flex col">
  <h3 id="iterators">Iterators & Generators</h3>
  <!-- <p>
    Iterators <br />
  </p> -->

  <Stack>
    <Code {code} />
    <Inspect name="gettersAndSetters" style="flex-basis: 50%" {value} />
  </Stack>
</div>
