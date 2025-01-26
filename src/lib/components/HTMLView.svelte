<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { TypeViewProps } from '../types.js'
  import { getAllProperties, isArray, isObject } from '../util.js'
  import { htmlState } from '../util/mutation-observer.svelte.js'
  import Expandable from './Expandable.svelte'
  import GetterSetter from './GetterSetter.svelte'
  import HtmlValue from './HTMLValue.svelte'
  import Node from './Node.svelte'
  import PropertyList from './PropertyList.svelte'

  type Props = TypeViewProps<HTMLElement> & { children?: Snippet }

  let { value, key = undefined, path, children, ...rest }: Props = $props()

  let element = $state(htmlState(value))
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
      element = htmlState(value)
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

  let entries = $derived(
    Object.entries({
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
  )

  let keys = $derived(
    getAllProperties(element.ele).filter(
      (prop) =>
        !['__svelte_meta', '__className', '__attributes', '__styles', '__t'].includes(
          prop.toString()
        )
    )
  )
</script>

<Expandable {...{ value, key, path }} length={entries.length} keepPreviewOnExpand {...rest}>
  {#snippet valuePreview()}
    {#key element.ele}
      <HtmlValue value={element.ele} />
    {/key}
  {/snippet}
  {#if children}
    {@render children()}
  {/if}
  <PropertyList {keys} value={element.ele}>
    {#snippet item({ key, descriptor })}
      {#if descriptor?.get || descriptor?.set}
        <GetterSetter value={element.ele} {descriptor} {key} {path} />
      {:else}
        <Node value={element.ele[key as keyof typeof value]} {key} {path} />
      {/if}
    {/snippet}
  </PropertyList>
</Expandable>
