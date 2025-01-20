<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
</script>

<div class="flex col">
  <h2>Map & Set</h2>
  <p><code>Inspect</code> handles map and set instances.</p>
  <p>
    For maps, if keys are not of type <code>number|string|symbol</code>, the entry is shown as an
    expandable <code>Entry</code>
  </p>

  <div class="flex">
    <Inspect
      value={{
        map: new Map<unknown, unknown>([
          ['yeah', 1],
          [3, 2],
          [{ name: 'object key' }, 3],
          [[1, 2], 3],
          [Symbol('1'), 4],
          [/r(e+)gExp?/, 'regex key'],
        ]),
        set: new Set([1, 2, 3, 'four']),
      }}
      name="mapAndSet"
    />
  </div>
</div>
