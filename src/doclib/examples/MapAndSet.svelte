<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { getContext } from 'svelte'
  import { SvelteSet, SvelteMap } from 'svelte/reactivity'

  getContext<SvelteMap<string, string>>('toc')?.set('Map & Set', 'map-and-set')

  const value = $state({
    map: new Map<unknown, unknown>([
      ['yeah', 1],
      [3, 2],
      [{ name: 'object key' }, 3],
      [[1, 2], 3],
      [Symbol('1'), 4],
      [/r(e+)gExp?/, 'regex key'],
    ]),
    svelteMap: new SvelteMap<unknown, unknown>([
      ['yeah', 1],
      [3, 2],
      [{ name: 'object key' }, 3],
      [[1, 2], 3],
      [Symbol('1'), 4],
      [/r(e+)gExp?/, 'regex key'],
    ]),
    set: new Set([1, 2, 3, 'four']),
    svelteSet: new SvelteSet([1, 2, 3, 'four']),
  })
</script>

<div class="flex col">
  <h3 id="map-and-set">Map & Set</h3>
  <p><code>Inspect</code> handles map and set instances.</p>

  <Inspect style="width: 500px" {value} name="mapAndSet" />
</div>
