<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
</script>

<div class="flex col">
  <h2>map & set</h2>
  <p>handles map and set instances.</p>
  <p>
    for maps, if keys are not of type <code>number|string|symbol</code>, the entry is shown as a
    key/value tuple:
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
        ]),
        set: new Set([1, 2, 3, 'four']),
      }}
      name="mapAndSet"
    />
  </div>
</div>
