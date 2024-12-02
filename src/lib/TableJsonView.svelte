<script lang="ts">
  import { setContext } from 'svelte'
  import { createOptions } from './options.svelte.js'

  import './table-view.css'

  // import { draggable as dragAction } from '@neodrag/svelte'
  import JsonViewer from './table-components/JsonViewer.svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Action } from 'svelte/action'
  import type { DragOptions } from '@neodrag/svelte'

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

  let dragAction: Action<HTMLElement, DragOptions | undefined> | undefined = $state(undefined)

  let getAction: Action<HTMLElement, () => DragOptions | undefined> = (el, params) => {
    $effect(() => {
      if (dragAction) {
        let actReturn = dragAction(el, params())
        console.log(actReturn)

        return () => {
          actReturn?.destroy?.()
        }
      }
    })
  }

  async function loadDraggable() {
    if (!dragAction) {
      const module = await import('@neodrag/svelte')
      dragAction = module.draggable
    }
  }

  $effect(() => {
    if (draggable && !dragAction) {
      loadDraggable()
    }
  })
</script>

<div
  class="ampled-json-inspect {classValue}"
  class:draggable
  use:getAction={() => ({ handle: '.handle', disabled: !draggable })}
  {...rest}
>
  <div class="body">
    {#if draggable}
      <div class="handle"></div>
    {/if}

    <JsonViewer {value} key={name} />
  </div>
</div>
