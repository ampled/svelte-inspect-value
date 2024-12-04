<script lang="ts">
  import Line from './Line.svelte'
  import Key from './Key.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import Type from './Type.svelte'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = TypeViewProps<any> & { val?: Snippet } & HTMLAttributes<HTMLSpanElement>

  let { value, key, type, path, val, ...rest }: Props = $props()
</script>

<Line>
  <Key {key} {path} />
  <Type {type} />
  {#if val}
    {@render val()}
  {:else}
    <span title={value} class={`value ${type}`} {...rest}>{value}</span>
  {/if}
</Line>
