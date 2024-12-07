<script>
  import { slide } from 'svelte/transition'

  let { i = 0, children } = $props()
</script>

<div class="entry" style="--index: {i}" transition:slide={{ axis: 'y' }}>
  {@render children?.()}
</div>
