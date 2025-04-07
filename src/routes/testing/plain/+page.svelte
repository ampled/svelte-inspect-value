<script>
  import AllTypes from '../../../doclib/examples/AllTypes.svelte'

  let color = $state('#000000')
  let backgroundColor = $state('transparent')
</script>

<input type="color" bind:value={color} />
<input type="color" bind:value={backgroundColor} />

<div style="color: {color}; background-color: {backgroundColor}; padding: 2em;">
  <AllTypes theme="plain" />
</div>
