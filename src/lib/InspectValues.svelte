<script lang="ts">
  import { getContext } from 'svelte'
  import CollapseStateProvider from './CollapseStateProvider.svelte'
  import Wrapper from './Wrapper.svelte'
  import PropertyList from './components/PropertyList.svelte'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    type InspectOptions,
  } from './options.svelte.js'
  import type { InspectValuesOptions } from './types.js'
  import { getAllProperties, initialize } from './util.js'

  let props: Record<PropertyKey, unknown> = $props()
  let keys = $derived(getAllProperties(props))

  let withOptionsContext = getContext<InspectValuesOptions | undefined>(
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
  <CollapseStateProvider {onCollapseChange} values={props} {keys} name="">
    <Wrapper
      data-testid="inspect"
      class={[theme, noanimate && 'noanimate', borderless && 'borderless', classValue]}
      showExpandCollapse
      {...elementAttributes}
    >
      {#if keys.length}
        <PropertyList value={props} {keys} />
      {:else}
        <div style="color: var(--_comment-color); text-align: center">no value</div>
      {/if}
    </Wrapper>
  </CollapseStateProvider>
{/if}
