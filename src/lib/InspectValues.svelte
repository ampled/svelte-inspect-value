<script lang="ts">
  import { getContext } from 'svelte'
  import CollapseStateProvider from './CollapseStateProvider.svelte'
  import Wrapper from './Wrapper.svelte'
  import Node from './components/Node.svelte'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    type InspectOptions,
  } from './options.svelte.js'
  import type { ConfigurableOptions } from './types.js'
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

  let { theme, noanimate, borderless, onCollapseChange } = $derived(options.value)
  let { elementAttributes = {} } = $derived(withOptions)
  let { class: classValue } = $derived(elementAttributes)

  let shouldRender = $derived(
    typeof options.value.renderIf === 'function'
      ? Boolean(options.value.renderIf())
      : Boolean(options.value.renderIf)
  )

  initialize(options)
</script>

{#if shouldRender}
  <CollapseStateProvider {onCollapseChange}>
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
  </CollapseStateProvider>
{/if}
