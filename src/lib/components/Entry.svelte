<script lang="ts">
  import { slide } from 'svelte/transition'
  import { useOptions } from '../options.svelte.js'

  let { i = 0, children } = $props()

  let options = useOptions()
</script>

<div
  role="listitem"
  class="entry"
  style="--i: {i}"
  transition:slide={{
    duration: options.transitionDuration,
  }}
>
  {@render children?.()}
</div>
