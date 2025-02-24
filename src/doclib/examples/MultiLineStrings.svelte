<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import { getContext } from 'svelte'
  import type { SvelteMap } from 'svelte/reactivity'
  getContext<SvelteMap<string, string>>('toc')?.set('Multi-line strings', 'multiline')
</script>

<div class="flex col">
  <h3 id="multiline">Multi-line strings</h3>
  <p>Expandable view for multi-line strings</p>

  <Inspect
    style="width: 400px"
    value={['normal boring string', 'cool \n multi-line \n  render 😎']}
    name="strings"
    expandAll
  />
</div>
