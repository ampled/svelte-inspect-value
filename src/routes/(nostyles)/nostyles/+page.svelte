<script lang="ts">
  // import AllTypes from '$doclib/examples/AllTypes.svelte'
  import Inspect from '$lib/index.js'
  import { page } from '$app/state'

  let resize = $state(false)

  // const counter = new PersistedState('counter-asdfsg', 0, { syncTabs: false })
</script>

<label>
  resize
  <input type="checkbox" bind:checked={resize} />
</label>

<Inspect.Panel {resize} persist persistSync={{ key: 'dinglebopi' }} values={{ ...page }} width={520}
></Inspect.Panel>
