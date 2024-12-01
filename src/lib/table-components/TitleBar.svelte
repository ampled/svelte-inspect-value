<script>
  import CollapseButton from './CollapseButton.svelte'
  import Entries from './Entries.svelte'
  import Key from './Key.svelte'
  import Type from './Type.svelte'

  let { key, collapsed = $bindable(false), type, length } = $props()
</script>

<div class="title-bar">
  <CollapseButton bind:collapsed />
  <Key {key} />
  <Type {type} />
  <Entries {length} />
</div>
