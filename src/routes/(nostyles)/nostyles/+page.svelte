<script lang="ts">
  // import AllTypes from '$doclib/examples/AllTypes.svelte'
  import Inspect from '$lib/index.js'
  import { page } from '$app/state'

  // const counter = new PersistedState('counter-asdfsg', 0, { syncTabs: false })
</script>

<Inspect.Panel persist persistSync={{ key: 'dinglebop' }} values={{ ...page }}></Inspect.Panel>
