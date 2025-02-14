<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let expandAll = $state(false)
  let expandLevel = $state(0)
</script>

<input type="checkbox" bind:checked={expandAll} />
<input type="number" bind:value={expandLevel} />

<!-- {#key expandAll} -->
<Inspect value={[1, 2, [[[[[], [], [[[[]]]]]]]]]} {expandAll} {expandLevel} debug />
<!-- {/key} -->
