<script lang="ts">
  import { getContext, type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { flashOnUpdate } from '../action/update-flash.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import Key from './Key.svelte'
  import Tools from './Tools.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<unknown> & {
    val?: Snippet
  } & HTMLAttributes<HTMLSpanElement>

  let { value, display, key, type, path, val, oninspectvaluechange, ...rest }: Props = $props()

  let displayOrValue = $derived(display != null ? display : (value?.toString?.() ?? ''))

  const preview = getContext<boolean>('preview')
</script>

<div class="line" class:preview>
  {#if !preview}
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
  {/if}
  <Type {type} />
  {#if val}
    {@render val()}
  {:else}
    <span title={displayOrValue} class={`value ${type}`} {...rest}>
      {displayOrValue}
    </span>
  {/if}

  {#if !preview}
    <Tools {value} {path} {type} />
  {/if}
</div>

<style>
  .line {
    transition: background-color 0.2s ease-in-out;
    position: relative;
    /* transition-delay: 0.2s; */
    padding-left: calc(var(--indent) * 0.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    /* padding-left: 0.5em; */
    gap: 0.5em;
    /* border: 1px solid salmon; */

    &:hover,
    &:focus-within {
      background-color: var(--bg-lighter);
    }
  }

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
