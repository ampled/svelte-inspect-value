<script lang="ts">
  import Ace from './Ace.svelte'
  import type { AceProps } from './aceprops.js'

  let props: AceProps = $props()

  let ace = $state<ReturnType<typeof Ace>>()

  export function editor() {
    return ace
  }
</script>

<svelte:boundary><Ace bind:this={ace} {...props} /></svelte:boundary>
