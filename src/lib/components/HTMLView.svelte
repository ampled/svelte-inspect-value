<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { htmlState } from '$lib/util/mutation-observer.svelte.js'
  import type { Snippet } from 'svelte'
  import HtmlValue from './HTMLValue.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'
  import Entry from './Entry.svelte'
  import { getType } from '$lib/util.js'

  type Props = TypeViewProps<HTMLElement> & { children?: Snippet }

  let { value, key = undefined, type, path, children }: Props = $props()

  let element = $state(htmlState(value!))

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

  let entries = $derived(
    element.ele
      ? Object.entries({
          attrs: Object.fromEntries(attrs),
          class: element.ele.className.split(' ').filter(Boolean),
          styles: Object.fromEntries(styles),
          data: Object.fromEntries(Object.entries(element.ele.dataset)),
        }).filter((entry) =>
          entry.length && getType(entry[1]) === 'array'
            ? entry[1].length
            : getType(entry[1]) === 'object'
              ? Object.entries(entry[1]).length
              : false
        )
      : []
  )

  $inspect(entries)
</script>

<TitleBar {...{ value, key, type, path }} length={entries.length}>
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
</TitleBar>
