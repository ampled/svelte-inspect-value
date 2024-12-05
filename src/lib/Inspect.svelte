<script lang="ts">
  import './inspect.css'
  import { onMount, setContext } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Action } from 'svelte/action'
  import { createOptions } from './options.svelte.js'
  import JsonViewer from './table-components/JsonViewer.svelte'
  import type { DragOptions } from '@neodrag/svelte'
  import { type InspectState } from './state.svelte.js'
  import StateProvider from './StateContextProvider.svelte'
  import { fade } from 'svelte/transition'

  type Props = {
    value?: any
    name?: string
    rawIndent?: number
    showLength?: boolean
    showTypes?: boolean
    stringCollapse?: number
    stringRender?: 'stringify' | 'pre'
    draggable?: boolean
  } & HTMLAttributes<HTMLDivElement>

  let {
    value = undefined,
    name = undefined,
    showLength = false,
    showTypes = true,
    stringCollapse = undefined,
    class: classValue = '',
    draggable = false,
    stringRender = 'pre',
    ...rest
  }: Props = $props()

  let options = createOptions({ showLength, showTypes, stringCollapse, stringRender })

  $effect(() => {
    options.value = { showLength, showTypes, stringCollapse, stringRender }
  })

  setContext('json-inspect', options)

  let initialState: InspectState | undefined = $state()

  onMount(() => {
    const v = localStorage.getItem('svelte-value-inspect')
    if (v) {
      try {
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
    if (draggable && !dragAction) {
      loadDraggable()
    }
  })
</script>

{#if initialState}
  <StateProvider {initialState} options={options.value}>
    <div
      in:fade
      class="ampled-json-inspect {classValue}"
      use:getAction={() => ({ handle: '.handle', disabled: !draggable })}
      {...rest}
    >
      <div class="body">
        {#if draggable}
          <div class="handle">&vellip;</div>
        {/if}
        <JsonViewer {value} key={name} />
      </div>
    </div>
  </StateProvider>
{/if}
