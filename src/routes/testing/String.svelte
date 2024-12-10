<script lang="ts">
  import CustomLine from '$lib/CustomLine.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import { onMount } from 'svelte'

  type Props = TypeViewProps<string>

  let { value, ...rest }: Props = $props()

  let doAnError = $state(false)

  onMount(() => {
    setTimeout(() => {
      doAnError = true
    }, 5000)
  })
</script>

<CustomLine {value} {...rest}>
  {#snippet val()}
    {value}
    {`<-- lookg at this string tho 😎`}
    <!-- {throw bababa} -->
    {#if doAnError}
      {(value as any).fdfsdfd.fsdfdsfdsfds.fdsfdsf}
    {/if}
  {/snippet}
</CustomLine>
