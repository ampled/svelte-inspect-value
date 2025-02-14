<script lang="ts">
  import { useOptions } from '$lib/options.svelte.js'
  import type { TypeViewProps } from '$lib/types.js'
  import HtmlView from './HTMLView.svelte'

  type Props = TypeViewProps<HTMLImageElement>

  let { value, ...rest }: Props = $props()

  let options = useOptions()
</script>

<HtmlView {value} {...rest}>
  {#if value.src && options.value.embedMedia}
    <div class="image">
      <img alt={value.alt} src={value.src} />
    </div>
  {/if}
</HtmlView>

<style>
  .image {
    height: 100px;
    width: 100px;
    resize: both;
    overflow: scroll;
  }

  img {
    object-fit: contain;
  }
</style>
