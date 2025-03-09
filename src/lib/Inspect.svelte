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

  let {
    showLength,
    showTypes,
    showPreview,
    previewDepth,
    previewEntries,
    showTools,
    quotes,
    expandAll,
    expandLevel,
    expandPaths,
    flashOnUpdate,
    stringCollapse,
    noanimate,
    borderless,
    theme,
    customComponents,
    embedMedia,
    elementView,
    renderIf,
    parseJson,
    onCopy,
    canCopy,
    onLog,
    ...props
  }: InspectProps = $props()

  let globalOptions = getContext<Partial<InspectOptions> | (() => Partial<InspectOptions>)>(
    GLOBAL_OPTIONS_CONTEXT
  )

  let mergedOptions = $derived(
    mergeOptions(
      {
        showLength,
        showTypes,
        showPreview,
        previewDepth,
        previewEntries,
        showTools,
        quotes,
        expandAll,
        expandLevel,
        expandPaths,
        flashOnUpdate,
        stringCollapse,
        noanimate,
        borderless,
        theme,
        customComponents,
        embedMedia,
        elementView,
        renderIf,
        parseJson,
        onCopy,
        canCopy,
        onLog,
      },
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
  <Root {...props} />
{/if}
