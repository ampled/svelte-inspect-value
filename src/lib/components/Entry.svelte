<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import { slide } from 'svelte/transition'

  let { i = 0, children } = $props()

  const options = useOptions()
</script>

<div
  role="listitem"
  class="entry"
  style="--i: {i}"
  transition:slide={{ duration: options.transitionDuration }}
>
  {@render children?.()}
</div>
