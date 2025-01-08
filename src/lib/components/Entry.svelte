<script lang="ts">
  import { slide } from 'svelte/transition'
  import { useOptions } from '../options.svelte.js'

  let { i = 0, children } = $props()

  let options = useOptions()
</script>

<div
  class="entry"
  style="--index: {i}"
  transition:slide={{
    duration: options.value.noanimate ? 0 : 200,
  }}
>
  {@render children?.()}
</div>

<style>
  .entry {
    margin-left: 0;
    opacity: 1;
  }
</style>
