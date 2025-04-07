<script lang="ts">
  import GlobalInspect from '$lib/GlobalInspect.svelte'
  import { onMount } from 'svelte'

  let demo = $state<Record<string, unknown>>({})

  async function getBattery() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as Record<string, any>

    if (nav.getBattery) {
      demo.battery = nav.getBattery()
    }
  }

  onMount(() => {
    getBattery()
  })
</script>

<h2>Global Inspect</h2>

<GlobalInspect position={['middle', 'left']} />
