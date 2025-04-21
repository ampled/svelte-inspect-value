<script>
  import AllTypes from '../../../doclib/examples/AllTypes.svelte'

  let color = $state('#ffffff')
  // let backgroundColor = $state('transparent')
</script>

<input type="color" bind:value={color} />
<!-- <input type="color" bind:value={backgroundColor} /> -->

<div style="color: {color};padding: 2em;">
  <AllTypes theme="plain" />
</div>
