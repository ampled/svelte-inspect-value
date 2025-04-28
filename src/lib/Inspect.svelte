<script lang="ts">
  import { getContext } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'
  import CollapseStateProvider from './CollapseStateProvider.svelte'
  import Node from './components/Node.svelte'
  import PropertyList from './components/PropertyList.svelte'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    type InspectOptions,
  } from './options.svelte.js'
  import { type InspectProps } from './types.js'
  import { getAllProperties, initialize, sortProps } from './util.js'
  import Wrapper from './Wrapper.svelte'

  let {
    value,
    values,
    name,
    class: classValue,
    heading = 'y',
    ...props
  }: InspectProps & SvelteHTMLElements['div'] = $props()

  let [optionsProps, restProps] = $derived(sortProps(props))

  const globalOptions = getContext<Partial<InspectOptions> | (() => Partial<InspectOptions>)>(
    GLOBAL_OPTIONS_CONTEXT
  )

  let mergedOptions = $derived(
    mergeOptions(
      optionsProps,
      typeof globalOptions === 'function' ? globalOptions() : globalOptions
    )
  )

  let options = createOptions(() => mergedOptions)

  let { theme, noanimate, borderless, onCollapseChange } = $derived(options.value)

  let shouldRender = $derived(
    typeof options.value.renderIf === 'function'
      ? Boolean(options.value.renderIf())
      : Boolean(options.value.renderIf)
  )

  let keys = $derived.by(() => {
    if (values) return getAllProperties(values)
    return []
  })

  initialize(options)
</script>

{#if shouldRender}
  <CollapseStateProvider {onCollapseChange}>
    <Wrapper
      data-testid="inspect"
      class={[classValue, theme, noanimate && 'noanimate', borderless && 'borderless']}
      {heading}
      {...restProps}
    >
      {#if values && keys.length}
        <PropertyList value={values} {keys} />
      {:else if name || value}
        <Node {value} key={name} />
      {:else}
        <div style="color: var(--_comment-color); text-align: center">no value</div>
      {/if}
    </Wrapper>
  </CollapseStateProvider>
{/if}
