<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let { data } = $props()

  let showInspect = $state(false)

  let largeArray = Array(1000)
    .fill(0)
    .map((_, i) => i)

  const value = {
    largeArray,
  }
</script>

<button onclick={() => (showInspect = !showInspect)}>toggle</button>

<div style="padding: 2em">
  {#if showInspect}
    <Inspect value={data.pokemon} />
  {/if}
</div>
