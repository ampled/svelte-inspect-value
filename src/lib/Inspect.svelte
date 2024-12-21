<script lang="ts">
  import type { DragOptions } from '@neodrag/svelte'
  import { setContext } from 'svelte'
  import type { Action } from 'svelte/action'
  import type { HTMLAttributes } from 'svelte/elements'
  import JsonViewer from './components/Node.svelte'
  import Options from './components/Options.svelte'
  import './inspect.css'
  import { createOptions, type JSONInspectOptions } from './options.svelte.js'
  import { type InspectState } from './state.svelte.js'
  import StateProvider from './StateContextProvider.svelte'

  type InspectProps = {
    value?: unknown
    name?: string
    onCollapseChange?: (state: InspectState) => void
  } & Partial<JSONInspectOptions> &
    HTMLAttributes<HTMLDivElement>

  let {
    value = undefined,
    name = undefined,
    showLength = true,
    showTypes = true,
    quotes = 'single',
    expandAll = false,
    stringCollapse = 0,
    noanimate = false,
    class: classValue = '',
    theme = 'drak',
    expandLevel = 1,
    draggable = false,
    customComponents = {},
    onCollapseChange,
    ...rest
  }: InspectProps = $props()

  let options = createOptions({
    showLength,
    showTypes,
    stringCollapse,
    draggable,
    noanimate,
    customComponents,
    theme,
    expandAll,
    expandLevel,
    quotes,
  })

  $effect(() => {
    options.setOptions({
      showLength,
      showTypes,
      stringCollapse,
      draggable,
      noanimate,
      customComponents,
      theme,
      expandAll,
      expandLevel,
      quotes,
    })
  })

  setContext('json-inspect', options)

  let initialState: InspectState | undefined = $state({})

  let dragAction: typeof import('@neodrag/svelte').draggable | undefined = $state()
  let actReturn: ReturnType<typeof import('@neodrag/svelte').draggable>

  let getAction: Action<HTMLElement, () => DragOptions | undefined> = (el, params) => {
    $effect(() => {
      if (dragAction) {
        if (!actReturn) {
          actReturn = dragAction(el, params())
        } else {
          actReturn.update?.(params())
        }
        return () => {
          actReturn?.destroy?.()
          actReturn = undefined
        }
      }
    })
  }

  async function loadDraggable() {
    const module = await import('@neodrag/svelte')
    dragAction = module.draggable
  }

  $effect(() => {
    if (options.value.draggable && !dragAction) {
      loadDraggable()
    }
  })

  let fixedBottom = $state(false)
</script>

<svelte:boundary>
  {#snippet failed(error, reset)}
    {#if error instanceof Error}
      {error.name}<br />
      {error.message}<br />
    {/if}
    <button onclick={reset}>retry</button>
  {/snippet}
  <!-- {#if initialState} -->
  <StateProvider {name} {initialState} options={options.value} onChange={onCollapseChange}>
    <div
      class:noanimate={options.value.noanimate}
      class="ampled-json-inspect {classValue} {options.value.theme}"
      class:fixedBottom
      use:getAction={() => ({ handle: '.handle', disabled: !options.value.draggable })}
      {...rest}
    >
      <Options />
      <div class="body">
        <!-- <button
            style="position: absolute; top:0; left: 0;"
            onclick={() => (fixedBottom = !fixedBottom)}>&#x21d2;</button> -->
        {#if options.value.draggable}
          <div class="handle">&#x22ee;</div>
        {/if}
        <JsonViewer {value} key={name} />
      </div>
    </div>
  </StateProvider>
  <!-- {/if} -->
</svelte:boundary>
