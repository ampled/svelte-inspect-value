<script lang="ts">
  import { useOptions } from '../options.svelte.js'
  import rotate from '../transition/rotate.js'

  const options = useOptions()
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g fill="currentColor">
    <path d="M9 9H4v1h5z" />
    <path
      d="M7 12V7H6v5z"
      style="transform-box: fill-box"
      transform-origin="center"
      in:rotate={{ rotation: '90deg', opacity: 1, duration: options.transitionDuration * 2 }}
      out:rotate={{ rotation: '450deg', opacity: 1, duration: options.transitionDuration * 2 }}
    />
    <path
      fill-rule="evenodd"
      d="m5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2zm1 2h4l1 1v4h2V3H6zm4 1H3v7h7z"
      clip-rule="evenodd"
    />
  </g>
</svg>
