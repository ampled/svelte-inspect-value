<script lang="ts">
  import './inspect.css'
  import { onMount, setContext } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Action } from 'svelte/action'
  import { createOptions } from './options.svelte.js'
  import JsonViewer from './components/JsonViewer.svelte'
  import type { DragOptions } from '@neodrag/svelte'
  import { type InspectState } from './state.svelte.js'
  import StateProvider from './StateContextProvider.svelte'
  import { fade } from 'svelte/transition'
  import Options from './components/Options.svelte'
  import LZ from 'lz-string'
  import type { CustomComponents } from './types.js'
  import { browser } from '$app/environment'
  import { prefersReducedMotion } from 'svelte/motion'

  type InspectProps = {
    value?: any
    name?: string
    showLength?: boolean
    showTypes?: boolean
    stringCollapse?: number
    savecollapse?: 'localStorage' | 'sessionStorage'
    noanimate?: boolean
    quotes?: 'single' | 'double'
    expandAll?: boolean
    theme?: string
    draggable?: boolean
    customComponents?: CustomComponents
  } & HTMLAttributes<HTMLDivElement>

  let {
    value = undefined,
    name = undefined,
    showLength = true,
    showTypes = true,
    savecollapse = 'localStorage',
    quotes = 'single',
    expandAll = false,
    stringCollapse = 0,
    noanimate = false,
    class: classValue = '',
    theme = 'cotton-candy',
    draggable = false,
    customComponents = {},
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
    })
  })

  setContext('json-inspect', options)

  let initialState: InspectState | undefined = $state({})

  onMount(() => {
    const v = localStorage.getItem('[svelte-value-inspect]' + name)
    if (v) {
      try {
        // initialState = JSON.parse(LZ.decompress(v))
        initialState = JSON.parse(v)
      } catch (e) {
        console.warn('[Svelte Value Inspect] Could not restore saved state')
      }
    } else {
      initialState = {}
    }
  })

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
        // console.log(actReturn)

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

<!-- {#if browser} -->
<!-- {#if initialState} -->
<svelte:boundary>
  {#snippet failed(error, reset)}
    {#if error instanceof Error}
      {error.name}<br />
      {error.message}<br />
    {/if}
    <button onclick={reset}>retry</button>
  {/snippet}
  {#if initialState}
    <StateProvider {name} {initialState} options={options.value}>
      <div
        in:fade
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
            onclick={() => (fixedBottom = !fixedBottom)}>&rArr;</button
          > -->
          {#if options.value.draggable}
            <div class="handle">&vellip;</div>
          {/if}
          <JsonViewer {value} key={name} />
        </div>
      </div>
    </StateProvider>
  {/if}
</svelte:boundary>
<!-- {/if} -->
