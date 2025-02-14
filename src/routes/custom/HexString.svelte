<script lang="ts">
  import { CustomLine, type CustomComponentProps } from '$lib/index.js'

  type Props = CustomComponentProps<
    string,
    'string',
    // extra props
    { showString?: boolean }
  >

  let { value, showString = true, ...rest }: Props = $props()

  let isColor = $derived(value.startsWith('#'))
</script>

<CustomLine {value} {...rest} type={isColor ? '' : 'string'}>
  {#if isColor}
    <div class="color" style="background-color: {value};" title={value}></div>
    {#if showString}
      <span class="value string">'{value}'</span>
    {/if}
  {:else}
    <span class="value string">'{value}'</span>
  {/if}
</CustomLine>

<style>
  .color {
    width: 3em;
    height: 1em;
    border: 1px solid var(--border-color);
    border-radius: 2px;
    margin-inline: 0.25em;
  }
</style>
