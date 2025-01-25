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
  in:slide={{
    axis: 'y',
    duration: options.value.noanimate ? 0 : 200,
  }}
  out:slide={{
    axis: 'x',
    duration: options.value.noanimate ? 0 : 200,
  }}
>
  {@render children?.()}
</div>
