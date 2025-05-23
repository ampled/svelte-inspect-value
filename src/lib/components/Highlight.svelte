<script module lang="ts">
  /** eslint-disable no-console */
  // import highlightWords from '../util/highlight-words/index.js'
  import { highlightText } from '../util/highlight-text.js'
  import memoize from 'memoize'

  // const highlight = memoize(highlightWords, {
  //   cacheKey: ([options]) =>
  //     options.text + options.query + (options.matchExactly ? 'exact' : 'false'),
  // })

  const hl = memoize(highlightText, {
    cacheKey: ([text, terms]) => text + terms.map((term) => term.value).join(''),
  })
</script>

<script lang="ts">
  /** eslint-disable no-console */
  import { useSearchContext } from '../contexts.js'
  import { parseSearchTerms } from '../util/search.js'
  import { useOptions } from '../options.svelte.js'

  type Props = {
    value: string
    field?: 'type' | 'path' | 'any' | 'token'
    alsoMatch?: string
  }

  // type Chunk = {
  //   key: string
  //   match: boolean
  //   text: string
  // }

  let { value: text, field, alsoMatch }: Props = $props()
  const searchCtx = useSearchContext()
  const options = useOptions()
  const { query, matchingPaths } = $derived(searchCtx())
  const { highlightMatches, search } = $derived(options.value)

  let terms = $derived(highlightMatches && search ? parseSearchTerms(query, false) : [])
  let chunks = $derived.by(() => {
    if (terms.length && highlightMatches && search) {
      try {
        return hl(text, terms)
        // return highlight({
        //   text,
        //   query: terms
        //     .filter((t) => t.field === 'any' || t.field === field)
        //     .map((t) => t.value)
        //     .join(' '),
        //   matchExactly: term.exact,
        // })
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

    if (highlightMatches && search && term && alsoMatch && term.value.length > 1) {
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

  $effect(() => {
    if (text === 'bools') {
      console.log('query:', $state.snapshot(query))
      console.log('terms', $state.snapshot(terms))
      console.log('chunks', $state.snapshot(chunks))
    }
  })
</script>

<button
  onclick={() =>
    // eslint-disable-next-line no-console
    console.log({
      terms,
      query: terms
        .filter((t) => t.field === 'any' || t.field === field)
        .map((t) => t.value)
        .join(' '),
      chunks,
      altMatch,
    })}
  style="display: contents"
>
  {#if highlightMatches && query.length > 1 && chunks.some((c) => c.match)}
    <span aria-label={text}>
      {#each chunks as chunk (chunk.start)}
        <span aria-hidden="true" class={['can-match', chunk.match && 'highlight chunk']}
          >{chunk.text}</span
        >
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
</button>

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
