<script lang="ts">
  import { backOut, sineOut } from 'svelte/easing'
  import { useOptions } from '../options.svelte.js'
  import rotate from '../transition/rotate.js'

  const options = useOptions()

  type Props = {
    expand?: boolean
  }

  let { expand }: Props = $props()
</script>

<svg viewBox="0 0 24 24" stroke-linecap="square" stroke-linejoin="round">
  <g fill="currentColor" stroke-width="2" stroke="currentColor">
    <!-- vert -->
    {#if expand}
      <path
        d="M 10 11 l 0 6"
        style="transform-box: fill-box"
        transform-origin="center"
        in:rotate={{
          rotation: 360 - 90,
          opacity: 1,
          duration: options.transitionDuration * 3,
          easing: backOut,
        }}
        out:rotate={{
          rotation: 360 + 90,
          opacity: 1,
          duration: options.transitionDuration * 3,
          easing: sineOut,
        }}
      />
    {/if}
    <!-- horiz -->
    <path d="M 7 14 l 6 0" />
    <!-- behindbox -->
    <path
      fill="none"
      d="
      M 2, 20
      l 0 -12
      a 2 2 0 0 1 2 -2
			h 12
			a 2 2 0 0 1 2 2
		  v 12
			a 2 2 0 0 1 -2 2
			h -12
			a 2 2 0 0 1 -2 -2
			z"
    />
    <path
      fill="none"
      d="
      M 6, 6
      l 0 -2
      a 2 2 0 0 1 2 -2
			h 12
      a 2 2 0 0 1 2 2
			v 12
			a 2 2 0 0 1 -2 2
			"
    />
  </g>
</svg>
