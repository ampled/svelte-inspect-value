<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlView from './HTMLView.svelte'

  type Props = TypeViewProps<HTMLImageElement>

  let { value, ...rest }: Props = $props()
</script>

<HtmlView {value} {...rest}>
  {#if value}
    <img alt={value.alt} src={value.src} />
  {/if}
</HtmlView>
