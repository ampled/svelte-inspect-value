<script lang="ts">
  import { flashOnUpdate } from '$lib/action/update-flash.svelte.js'
  import { useOptions } from '$lib/options.svelte.js'

  let { value = undefined } = $props()

  let options = useOptions()
</script>

<div class="bullet">
  <div
    class="dash"
    use:flashOnUpdate={{ value: () => value, enabled: () => options.value.flashOnUpdate }}
  ></div>
</div>

<style>
  .bullet {
    display: var(--dash-display);
    justify-content: center;
    align-items: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    width: 1em;
    height: 1em;
    min-width: 1em;
    max-width: 1em;
    user-select: none;

    .dash {
      background-color: var(--comments);
      width: 4px;
      height: 1px;
      border-radius: 0px;
      overflow: visible;
    }
  }
</style>
