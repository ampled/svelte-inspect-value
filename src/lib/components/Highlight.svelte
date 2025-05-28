<script module lang="ts">
  import { highlightText } from '../util/highlight-text.js'
  import memoize from 'memoize'

  const hl = memoize(highlightText, {
    cacheKey: ([text, terms]) => text + terms.map((term) => term.value).join(''),
  })
</script>

<script lang="ts">
  import { useSearchContext } from '../contexts.js'
  import { useOptions } from '../options.svelte.js'

  type Props = {
    value: string
    field?: 'type' | 'path' | 'any' | 'value'
    alsoMatch?: string
  }

  let { value: text, field = 'any', alsoMatch }: Props = $props()
  const searchCtx = useSearchContext()
  const options = useOptions()
  const { query, matchingPaths, terms } = $derived(searchCtx())
  const { highlightMatches, search } = $derived(options.value)

  let chunks = $derived.by(() => {
    if (terms.length && highlightMatches && search) {
      try {
        return hl(
          text,
          terms.filter((t) => t.field === field || t.field === 'any')
        )
      } catch (e) {
        console.error(e)
        return []
      }
    }
    return []
  })

  let altMatch = $derived.by<'full' | 'partial' | false>(() => {
    const term = terms[0]
    if (matchingPaths.length > 0) return false

    if (highlightMatches && search && term && alsoMatch != null && term.value.length > 1) {
      if (term.field !== 'any' && field != null && term.field !== field) return false
      const fullMatch = alsoMatch.toLowerCase() === term.value.toLowerCase()

      if (term.exact) {
        return fullMatch ? 'full' : false
      }
      const partialMatch = alsoMatch.toLowerCase().includes(term.value.toLowerCase())

      return fullMatch ? 'full' : partialMatch ? 'partial' : false
    }
    return false
  })
</script>

{#if highlightMatches && query.length > 1 && chunks.some((c) => c.match)}
  <span aria-label={text}>
    {#each chunks as chunk (chunk.start)}
      <span aria-hidden="true" class={['can-match', chunk.match && 'highlight chunk']}>
        {chunk.text}
      </span>
    {/each}
  </span>
{:else}
  <span
    class={[
      'can-match',
      altMatch === 'partial' && 'highlight alt-soft',
      altMatch === 'full' && 'highlight alt-full',
    ]}
  >
    {text}
  </span>
{/if}

<style>
  .highlight {
    &.chunk {
      background-color: var(--_text-search-highlight-color);
      color: var(--_background-color);
    }

    &.alt-soft {
      text-decoration-color: var(--_text-search-highlight-color);
    }

    &.alt-full {
      background-color: var(--_text-search-highlight-color);
      color: var(--_background-color);
    }
  }

  .can-match {
    transition:
      text-decoration-color 200ms ease-in-out,
      background-color 200ms ease-in-out,
      color 200ms ease-in-out;
    border-radius: 2px;
    background-color: transparent;
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-color: transparent;
  }
</style>
