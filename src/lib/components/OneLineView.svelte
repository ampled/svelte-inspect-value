<script lang="ts" generics="T = unknown">
  import { getContext } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { getPreviewLevel } from '../contexts.js'
  import type { TypeViewProps } from '../types.js'
  import Bullet from './Bullet.svelte'
  import Count from './Count.svelte'
  import Key from './Key.svelte'
  import NodeNote from './NodeNote.svelte'
  import Tools from './Tools.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<T> & { length?: number } & HTMLAttributes<HTMLDivElement>

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
    length,
    note,
    children,
    ...rest
  }: Props = $props()

  let displayOrValue = $derived(display != null ? display : (value?.toString?.() ?? ''))
  let title = $derived(
    typeof value === 'string' ? value : display != null ? display : value?.toString()
  )

  let previewLevel = getPreviewLevel()
  let isKey = getContext<boolean | undefined>(Symbol.for('siv.key'))
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
      <Bullet {value} />
    {/if}
    {#if showKey}
      <Key disabled prefix={keyPrefix} delim={keyDelim} style={keyStyle} {key} {path} />
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
  {#if !previewLevel}
    {#if note}
      <NodeNote title={note.description}>{note.title}</NodeNote>
    {/if}
    {#if typeof length === 'number'}
      <Count {length} {type} />
    {/if}

    {#if !isKey}
      <Tools {value} {path} {type}></Tools>
    {/if}
  {/if}
</div>

<style>
  @import './styles/line.css';
</style>
