<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlValue from './HTMLValue.svelte'
  import TitleBar from './TitleBar.svelte'

  type Props = TypeViewProps<HTMLImageElement>

  let { value = undefined, key = undefined, type, path }: Props = $props()
</script>

{#if value}
  <TitleBar {...{ value, key, type, path }} length={1}>
    {#snippet val()}
      <HtmlValue {value} />
    {/snippet}
    <img alt={value.alt} src={value.src} />
  </TitleBar>
{/if}
