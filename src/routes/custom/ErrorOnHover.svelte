<script lang="ts">
  import { CustomLine, type CustomComponentProps } from '$lib/index.js'

  type Props = CustomComponentProps

  let { value, ...rest }: Props = $props()

  let doAnError = $state(false)
</script>

<CustomLine {value} {...rest}>
  {#snippet val()}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span onmouseenter={() => (doAnError = true)}>
      {value}
    </span>
    {#if doAnError}
      err
      <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
      {(value as any).fdfsdfd.fsdfdsfdsfds.fdsfdsf}
    {/if}
  {/snippet}
</CustomLine>
