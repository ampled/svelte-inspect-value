<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlValue from './HTMLValue.svelte'
  import HtmlView from './HTMLView.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<HTMLImageElement>

  let { value = undefined, ...rest }: Props = $props()
</script>

<!-- {#if value}
  <TitleBar {...{ value, key, type, path }} length={1}>
    {#snippet val()}
      <HtmlValue {value} />
    {/snippet}
    <img alt={value.alt} src={value.src} />
  </TitleBar>
{/if} -->

<HtmlView {value} {...rest}>
  {#if value}
    <img alt={value.alt} src={value.src} />
  {/if}
</HtmlView>
