<script lang="ts">
  import { getContext } from 'svelte'
  import Node from './components/Node.svelte'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    type InspectOptions,
  } from './options.svelte.js'
  import { createState } from './state.svelte.js'
  import { type InspectProps } from './types.js'
  import { initialize, sortProps } from './util.js'
  import Wrapper from './Wrapper.svelte'

  let { value, name, class: classValue, ...props }: InspectProps = $props()

  let [optionsProps, restProps] = $derived(sortProps(props))

  let globalOptions = getContext<Partial<InspectOptions> | (() => Partial<InspectOptions>)>(
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

  let initState = $state({})
  const inspectState = createState(initState, (state) => onCollapseChange?.(state))

  let shouldRender = $derived(
    typeof options.value.renderIf === 'function'
      ? Boolean(options.value.renderIf())
      : Boolean(options.value.renderIf)
  )

  initialize(options, inspectState)
</script>

{#if shouldRender}
  <Wrapper
    data-testid="inspect"
    class={[classValue, theme, noanimate && 'noanimate', borderless && 'borderless']}
    {...restProps}
  >
    <Node {value} key={name} />
  </Wrapper>
{/if}
