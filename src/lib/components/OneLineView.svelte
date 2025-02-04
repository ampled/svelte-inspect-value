<script lang="ts" generics="T = unknown">
  import { getPreviewLevel } from '$lib/contexts.js'
  import { useOptions } from '$lib/options.svelte.js'
  import { getContext } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { flashOnUpdate } from '../action/update-flash.svelte.js'
  import type { TypeViewProps } from '../types.js'
  import Key from './Key.svelte'
  import Tools from './Tools.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<T> & HTMLAttributes<HTMLDivElement>

  let {
    value,
    display,
    key,
    showKey = true,
    keyDelim = ':',
    keyPrefix,
    keyStyle,
    type,
    forceType,
    path,
    children,
    ...rest
  }: Props = $props()

  let displayOrValue = $derived(display != null ? display : (value?.toString?.() ?? ''))
  let title = $derived(
    typeof value === 'string' ? value : display != null ? display : value?.toString()
  )

  let options = useOptions()
  let previewLevel = getPreviewLevel()
  let isKey = getContext<boolean | undefined>('key')
</script>

<div
  data-testid="line"
  class="line"
  class:preview={previewLevel || isKey}
  class:nokey={!showKey}
  {...rest}
>
  <div class="indicator-and-key">
    {#if !previewLevel && !isKey}
      <div
        class="dash"
        use:flashOnUpdate={{ value: () => value, enabled: () => options.value.flashOnUpdate }}
      >
        &hyphen;
      </div>
    {/if}
    {#if showKey}
      <Key prefix={keyPrefix} delim={keyDelim} style={keyStyle} {key} {path} />
    {/if}
  </div>
  {#if !isKey}
    <Type {type} force={forceType} />
  {/if}
  {#if children}
    {@render children()}
  {:else if displayOrValue}
    <span data-testid="value" {title} class="value {type}">
      {displayOrValue}
    </span>
  {/if}

  {#if !previewLevel && !isKey}
    <Tools {value} {path} {type} />
  {/if}
</div>

<style>
  .line {
    transition: background-color 0.2s ease-in-out;
    position: relative;
    display: flex;
    gap: var(--line-gap, 0.5em);
    min-height: 1.5em;
    max-height: 1.5em;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: calc(var(--indent) * 0.5);

    &:hover,
    &:focus-within {
      background-color: var(--bg-lighter);
    }
  }

  .line.preview {
    padding-left: 0;
  }

  .line.preview.nokey {
    gap: 0;

    .indicator-and-key {
      display: none;
    }
  }

  .indicator-and-key {
    display: inline-flex;
    align-items: center;
    gap: 0.25em;
    user-select: none;

    .dash {
      display: inline-flex;
      justify-content: center;
      text-align: center;
      vertical-align: middle;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: 1em;
      height: 1em;
      min-width: 1em;
      max-width: 1em;
      line-height: 1em;
      color: var(--comments);
      user-select: none;
    }
  }
</style>
