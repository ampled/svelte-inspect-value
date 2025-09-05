<script lang="ts">
  // import AllTypes from '$doclib/examples/AllTypes.svelte'
  import Inspect from '$lib/index.js'
  import { page } from '$app/state'

  let width = $state(400)

  // const counter = new PersistedState('counter-asdfsg', 0, { syncTabs: false })
</script>

<Inspect.Panel
  persist="doo-wop"
  bind:width
  search
  onSettingsChange={(_settings, changed) => {
    // eslint-disable-next-line no-console
    console.log('settingschanged:', changed)
  }}
  values={{ width, ...page }}
></Inspect.Panel>
