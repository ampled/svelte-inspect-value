<script lang="ts">
  import { CustomLine, type CustomComponentProps } from '$lib/index.js'

  type Props = CustomComponentProps<string>

  let { value, ...rest }: Props = $props()

  let isColor = $derived(value.startsWith('#'))
</script>

<CustomLine {value} {...rest}>
  <span class="value string">"{value}"</span>
  {#if isColor}
    <div class="color" style="background-color: {value};"></div>
  {/if}
</CustomLine>

<style>
  .color {
    width: 1.2em;
    height: 1.2em;
    outline: 1px solid var(--border-color);
    border-radius: 9999px;
  }
</style>
