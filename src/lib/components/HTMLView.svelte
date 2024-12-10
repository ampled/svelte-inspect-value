<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { htmlState } from '$lib/util/mutation-observer.svelte.js'
  import type { Snippet } from 'svelte'
  import HtmlValue from './HTMLValue.svelte'
  import JsonViewer from './JsonViewer.svelte'
  import TitleBar from './TitleBar.svelte'
  import Entry from './Entry.svelte'

  type Props = TypeViewProps<HTMLElement> & { children?: Snippet }

  let { value, key = undefined, type, path, children }: Props = $props()

  const oop = htmlState(value!)

  let attrs = $derived.by(() => {
    if (oop.ele) {
      return Object.entries(oop.ele.attributes)
        .map(([, attr]) => [attr.name, attr.value])
        .filter(([name]) => !['class', 'style', 'data'].includes(name) && !name.startsWith('data-'))
    }
    return []
  })

  let styles = $derived.by(() => {
    if (oop.ele) {
      const elementStyle = oop.ele.style
      const out: Record<string, any> = {}
      for (const prop in elementStyle) {
        // We check if the property belongs to the CSSStyleDeclaration instance
        // We also ensure that the property is a numeric index (indicating an inline style)
        if (Object.hasOwn(elementStyle, prop) && !Number.isNaN(Number.parseInt(prop))) {
          out[elementStyle[prop]] = elementStyle.getPropertyValue(elementStyle[prop])
        }
      }
      return out
    }
    return {}
  })

  let entries = $derived(
    oop.ele
      ? [
          ...attrs,
          ...Object.entries({
            class: oop.ele.className.split(' ').filter(Boolean),
            styles,
            data: Object.fromEntries(Object.entries(oop.ele.dataset)),
          }),
        ]
      : []
  )
</script>

<TitleBar {...{ value, key, type, path }} length={entries.length}>
  {#snippet val()}
    <HtmlValue {value} />
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
