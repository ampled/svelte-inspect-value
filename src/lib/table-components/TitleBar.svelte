<script>
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'
  import Key from './Key.svelte'
  import Type from './Type.svelte'

  let { key, collapsed = $bindable(false), type, length, value = '' } = $props()
</script>

<div class="title-bar">
  <!-- {#if length > 0} -->
  <div style:opacity={length > 0 ? 1 : 0}>
    <CollapseButton bind:collapsed />
  </div>
  <!-- {/if} -->
  <Key {key} />
  <span>&nbsp;</span>
  <Type {type} />
  <span>&nbsp;</span>
  {#if value}
    <span class="value {type}">
      {value}
    </span>
    <span>&nbsp;</span>
  {/if}
  <Entries {length} />
</div>
