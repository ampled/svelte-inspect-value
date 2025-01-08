<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { TypeViewProps } from '../types.js'
  import { isArray, isObject } from '../util.js'
  import { htmlState } from '../util/mutation-observer.svelte.js'
  import Entry from './Entry.svelte'
  import Expandable from './Expandable.svelte'
  import HtmlValue from './HTMLValue.svelte'
  import JsonViewer from './Node.svelte'

  type Props = TypeViewProps<HTMLElement> & { children?: Snippet }

  let { value, key = undefined, type, path, children }: Props = $props()

  let element = $state(htmlState(value!))
  let scrollLeft = $state<number | undefined>(value?.scrollLeft)
  let scrollTop = $state<number | undefined>(value?.scrollTop)

  $effect(() => {
    const onscroll = (event: Event) => {
      const target = event.target as HTMLElement
      scrollLeft = target.scrollLeft
      scrollTop = target.scrollTop
    }

    if (value) {
      value.addEventListener('scroll', onscroll)
    }

    return () => {
      value.removeEventListener('scroll', onscroll)
    }
  })

  $effect(() => {
    if (value && value !== element.ele) {
      element.destroy()
      element = htmlState(value!)
    }
  })

  let attrs = $derived.by(() => {
    if (element.ele) {
      return Object.entries(element.ele.attributes)
        .map(([, attr]) => [attr.name, attr.value])
        .filter(([name]) => !['class', 'style', 'data'].includes(name) && !name.startsWith('data-'))
    }
    return []
  })

  let styles = $derived.by(() => {
    if (element.ele) {
      const elementStyle = element.ele.style
      const out: [string, string][] = []
      for (const prop in elementStyle) {
        // We check if the property belongs to the CSSStyleDeclaration instance
        // We also ensure that the property is a numeric index (indicating an inline style)
        if (Object.hasOwn(elementStyle, prop) && !Number.isNaN(Number.parseInt(prop))) {
          const value = elementStyle.getPropertyValue(elementStyle[prop])
          if (value)
            out.push([elementStyle[prop], elementStyle.getPropertyValue(elementStyle[prop])])
        }
      }
      return out
    }
    return []
  })

  // let eventListeners = $derived.by(() => {
  //   if (element.ele) {
  //     getEvent
  //     element.ele.
  //   }
  // })

  let entries = $derived(
    element.ele
      ? Object.entries({
          ...Object.fromEntries(attrs),
          class: element.ele.className.split(' ').filter(Boolean),
          styles: Object.fromEntries(styles),
          data: Object.fromEntries(Object.entries(element.ele.dataset)),
          scroll: {
            left: scrollLeft,
            top: scrollTop,
          },
        }).filter(([, v]) =>
          isArray(v) ? v.length : isObject(v) ? Object.entries(v).length : v != null
        )
      : []
  )
</script>

<Expandable {...{ value, key, type, path }} length={entries.length} keepPreviewOnExpand>
  {#snippet val()}
    {#key element.ele}
      <HtmlValue value={element.ele} />
    {/key}
  {/snippet}
  {#if children}
    {@render children()}
  {/if}
  {#each entries as [key, value], i (key)}
    <Entry {i}>
      <JsonViewer {value} {key} {path} />
    </Entry>
  {/each}
</Expandable>
