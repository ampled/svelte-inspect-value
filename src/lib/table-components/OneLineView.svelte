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
  <div class="dash-key">
    <div class="dash">&hyphen;</div>
    <Key {key} {path} />
  </div>
  <Type {type} />
  {#if val}
    {@render val()}
  {:else}
    <span title={value} class={`value ${type}`} {...rest}>
      {value}
    </span>
  {/if}
</Line>

<style>
  .dash-key {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--indent) * 0.5);
    padding-left: 1px;

    .dash {
      display: inline-flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: 1em;
      height: 1em;
      line-height: 1em;
      color: var(--comments);
      user-select: none;
    }
  }
</style>
