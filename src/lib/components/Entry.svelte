<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import { slide } from 'svelte/transition'

  let { i = 0, children } = $props()

  let options = useOptions()
</script>

<div
  class="entry"
  style="--index: {i}"
  transition:slide={{
    duration: options.noanimate ? 0 : 200,
  }}
>
  {@render children?.()}
</div>
