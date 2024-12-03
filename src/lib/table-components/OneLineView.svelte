<script lang="ts">
  import Line from './Line.svelte'
  import Key from './Key.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import Type from './Type.svelte'
  import type { Snippet } from 'svelte'

  type Props = TypeViewProps<any> & { val?: Snippet }

  let { value, key, type, path, val }: Props = $props()
</script>

<Line>
  <Key {key} {path} />
  <Type {type} />
  {#if val}
    {@render val()}
  {:else}
    <span title={value} class={`value ${type}`}>{value}</span>
  {/if}
</Line>
