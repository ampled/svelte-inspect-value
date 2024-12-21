<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import { fly } from 'svelte/transition'

  let { i = 0, children } = $props()

  let options = useOptions()
</script>

<div
  class="entry"
  style="--index: {i}"
  in:fly|global={{
    x: 10,
    delay: options.noanimate ? 0 : 10 * i,
    duration: options.noanimate ? 0 : 400,
  }}
>
  {@render children?.()}
</div>
