<script lang="ts">
  import { setContext } from 'svelte'

  import { createOptions } from './options.svelte.js'

  import { fade, slide } from 'svelte/transition'

  import CollapseButton from './table-components/CollapseButton.svelte'

  import './table-view.css'
  import { getType, noopAction } from './util.js'

  // import { draggable as dragAction } from '@neodrag/svelte'
  import JsonViewer from './table-components/JsonViewer.svelte'
  import Type from './table-components/Type.svelte'
  import Entries from './table-components/Entries.svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Action } from 'svelte/action'
  import Noop from './table-components/Noop.svelte'
  import type { DragOptions } from '@neodrag/svelte'

  type Props = {
    value?: any
    name?: string
    rawIndent?: number
    showLength?: boolean
    showTypes?: boolean
    stringCollapse?: number
    draggable?: boolean
  } & HTMLAttributes<HTMLDivElement>

  let {
    value = undefined,
    name = undefined,
    showLength = false,
    showTypes = true,
    stringCollapse = 20,
    class: classValue = '',
    draggable = false,
    ...rest
  }: Props = $props()

  let hideBody = $state(false)
  let type = $derived(getType(value))
  let options = createOptions({ showLength, showTypes, stringCollapse })
  $effect(() => {
    options.value = { showLength, showTypes, stringCollapse }
  })

  setContext('json-inspect', options)

  let length = $derived(
    type === 'array'
      ? (value as any[]).length
      : type === 'object'
        ? Reflect.ownKeys(value as object).length
        : undefined
  )

  $effect(() => {
    if (!name) {
      name = type
    }
  })

  let dragAction: Action<HTMLElement, DragOptions | undefined> | undefined = $state(undefined)
  let action = $derived(draggable && dragAction ? dragAction : noopAction)

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

<!-- {#key action} -->
<div
  class="ampled-json-inspect {classValue}"
  class:draggable
  use:getAction={() => ({ handle: '.handle', bounds: 'body', disabled: !draggable })}
  {...rest}
>
  <!-- <div
      class="title-bar handle"
      style:border-left-width={type === 'object' || type === 'array' ? '1px' : '0px'}
    >
      <CollapseButton bind:collapsed={hideBody} />
      <span>{name} <Type {type} /></span>
      {#if typeof length === 'number'}
        <Entries {length} />
      {/if}
    </div> -->
  <!-- <div class="tabs">
      <div class="tab">
        <CollapseButton bind:collapsed={hideBody} />
      </div>
      <div class="handle">&CircleDot;</div>
    </div> -->
  {#if !hideBody}
    <div class="body" transition:slide>
      {#if draggable}
        <div class="handle"></div>
      {/if}

      <JsonViewer {value} key={name} />
    </div>
  {/if}
</div>
<!-- {/key} -->
