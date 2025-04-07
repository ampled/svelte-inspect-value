<script lang="ts">
  import { getContext } from 'svelte'
  import Wrapper from './Wrapper.svelte'
  import Node from './components/Node.svelte'
  import type { ConfigurableOptions } from './configurable.js'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    type InspectOptions,
  } from './options.svelte.js'
  import { createState } from './state.svelte.js'
  import { initialize } from './util.js'

  let props: Record<string, unknown> = $props()
  let values = $derived(Object.entries(props))

  let withOptionsContext = getContext<ConfigurableOptions | undefined>(
    Symbol.for('siv.with-options')
  )
  let withOptions = $derived.by(() => {
    if (typeof withOptionsContext === 'function') {
      return withOptionsContext()
    }
    return {}
  })

  let globalOptions = getContext<Partial<InspectOptions> | (() => Partial<InspectOptions>)>(
    GLOBAL_OPTIONS_CONTEXT
  )
  let mergedOptions = $derived(
    mergeOptions(withOptions, typeof globalOptions === 'function' ? globalOptions() : globalOptions)
  )

  const options = createOptions(() => mergedOptions)

  let { theme, noanimate, borderless } = $derived(options.value)
  let { elementAttributes = {} } = $derived(withOptions)
  let { class: classValue } = $derived(elementAttributes)

  let shouldRender = $derived(
    (typeof options.value.renderIf === 'function'
      ? Boolean(options.value.renderIf())
      : Boolean(options.value.renderIf)) && values.length
  )

  const initState = $state({})
  const inspectState = createState(initState, (state) => options.value.onCollapseChange?.(state))
  initialize(options, inspectState)
</script>

{#if shouldRender}
  <Wrapper
    data-testid="inspect"
    class={[theme, noanimate && 'noanimate', borderless && 'borderless', classValue]}
    {...elementAttributes}
  >
    {#each values as [name, value]}
      <Node {value} key={name} />
    {:else}
      <div style="color: var(--_comment-color); text-align: center">no value</div>
    {/each}
  </Wrapper>
{/if}
