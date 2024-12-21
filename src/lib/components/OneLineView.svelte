<script lang="ts">
  import Line from './Line.svelte'
  import Key from './Key.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import Type from './Type.svelte'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import Tools from './Tools.svelte'
  import { flashOnUpdate } from '$lib/action/update-flash.svelte.js'

  type Props = TypeViewProps<unknown> & {
    val?: Snippet
  } & HTMLAttributes<HTMLSpanElement>

  let { value, display, key, type, path, val, oninspectvaluechange, ...rest }: Props = $props()

  let displayOrValue = $derived(display != null ? display : (value?.toString?.() ?? ''))
</script>

<Line>
  <div class="dash-key">
    <div class="dash">
      <span
        use:flashOnUpdate={{ value: () => value }}
        oninspectvaluechange={() => {
          oninspectvaluechange?.()
        }}>&hyphen;</span
      >
    </div>
    <Key {key} {path} />
  </div>
  <Type {type} />
  {#if val}
    {@render val()}
  {:else}
    <span title={displayOrValue} class={`value ${type}`} {...rest}>
      {displayOrValue}
    </span>
  {/if}
  <div class="tools">
    <Tools {value} {path} />
  </div>
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
      vertical-align: middle;
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
