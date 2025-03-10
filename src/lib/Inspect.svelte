<script lang="ts">
  import { getContext, setContext } from 'svelte'
  import Root from './Root.svelte'
  import {
    createOptions,
    GLOBAL_OPTIONS_CONTEXT,
    mergeOptions,
    OPTIONS_CONTEXT,
    type InspectOptions,
  } from './options.svelte.js'
  import type { InspectProps } from './types.js'
  import { sortProps } from './util.js'

  let { value, name, ...props }: InspectProps = $props()

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
  setContext(OPTIONS_CONTEXT, options)

  let shouldRender = $derived(
    typeof options.value.renderIf === 'function'
      ? Boolean(options.value.renderIf())
      : Boolean(options.value.renderIf)
  )
</script>

{#if shouldRender}
  <Root {value} {name} {...restProps} />
{/if}
