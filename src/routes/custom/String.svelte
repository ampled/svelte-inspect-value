<script lang="ts">
  import CustomLine from '$lib/CustomLine.svelte'
  import { onMount, type ComponentProps } from 'svelte'

  type Props = ComponentProps<typeof CustomLine>

  let { value, ...rest }: Props = $props()

  let doAnError = $state(false)

  onMount(() => {
    setTimeout(() => {
      doAnError = true
    }, 2000)
  })
</script>

<CustomLine {value} {...rest}>
  {#snippet val()}
    {value}
    {`<-- look at this string tho 😎`}
    <!-- {throw bababa} -->
    {#if doAnError}
      err
      <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
      {(value as any).fdfsdfd.fsdfdsfdsfds.fdsfdsf}
    {/if}
  {/snippet}
</CustomLine>
