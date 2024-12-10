<script lang="ts">
  import Line from './Line.svelte'
  import Key from './Key.svelte'
  import type { TypeViewProps } from '$lib/types.js'
  import Type from './Type.svelte'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { fly } from 'svelte/transition'
  import Tools from './Tools.svelte'
  import { stringify } from '$lib/util.js'

  type Props = TypeViewProps<any> & {
    val?: Snippet
    display?: string
  } & HTMLAttributes<HTMLSpanElement>

  let { value, display, key, type, path, val, ...rest }: Props = $props()

  // $inspect(value)

  let displayOrValue = $derived(display != null ? display : value)

  let changeDetect = $derived.by(() => {
    if (type === 'object' || type === 'array' || type === 'string' || type === 'number') {
      return stringify(value)
    } else if (type === 'symbol') {
      return value.toString()
    }
    return displayOrValue
  })
</script>

<Line>
  <div class="dash-key">
    {#key changeDetect}
      <div class="dash flash-update">&hyphen;</div>
    {/key}
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
    <!-- <small>{level}</small> -->
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
      border-radius: 9999px;
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
      /* transition: all 500ms; */
    }
  }
</style>
