<script lang="ts">
  import { flashOnUpdate } from '../action/update-flash.svelte.js'
  import { useOptions } from '../options.svelte.js'

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
    display: inline-flex;
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
      background-color: var(--_bullet-color);
      width: 4px;
      height: 1px;
      border-radius: 0px;
      overflow: visible;
    }
  }
</style>
