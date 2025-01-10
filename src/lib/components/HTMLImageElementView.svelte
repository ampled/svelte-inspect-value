<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlView from './HTMLView.svelte'

  type Props = TypeViewProps<HTMLImageElement>

  let { value, ...rest }: Props = $props()

  let options = useOptions()
</script>

<HtmlView {value} {...rest}>
  {#if value && options.value.embedMedia}
    <img alt={value.alt} src={value.src} />
  {/if}
</HtmlView>
