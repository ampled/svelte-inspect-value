<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  let data = JSON.parse(`{}`)
  let show = $state(false)
  let expandAll = $state(false)
</script>

<label>
  show
  <input type="checkbox" bind:checked={show} />
</label>
<label>
  expand all
  <input type="checkbox" bind:checked={expandAll} />
</label>

{#if show}
  <Inspect
    borderless
    value={data}
    {expandAll}
    showTools={false}
    showPreview={false}
    showLength={false}
    showTypes={false}
    flashOnUpdate={false}
    noanimate={false}
  />
{/if}
