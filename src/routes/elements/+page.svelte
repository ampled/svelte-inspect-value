<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let div = $state()
</script>

<div bind:this={div}>a</div>

<Inspect value={div} name="body" />
