<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { TypeViewProps } from '../types.js'
  // import { htmlState } from '../util/mutation-observer.svelte.js'
  import { useOptions } from '$lib/options.svelte.js'
  import HtmlViewFull from './HTMLViewFull.svelte'
  import HtmlViewSimple from './HTMLViewSimple.svelte'

  type Props = TypeViewProps<HTMLElement> & { children?: Snippet }

  let props: Props = $props()

  const options = useOptions()
</script>

{#if options.value.elementView === 'simple'}
  <HtmlViewSimple {...props} />
{:else}
  <HtmlViewFull {...props} />
{/if}
