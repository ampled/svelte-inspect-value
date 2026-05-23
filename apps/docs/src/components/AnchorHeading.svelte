<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { SvelteHTMLElements } from 'svelte/elements'

  type Props = {
    level: 1 | 2 | 3 | 4 | 5 | 6 | `${1 | 2 | 3 | 4 | 5 | 6}`;
	  id: string;
    children: Snippet
  } & SvelteHTMLElements['h1']

  let {level, id, children,...rest}: Props = $props()

  let ele = $derived(`h${level}`)
</script>

<div class={`sl-heading-wrapper level-h${level}`}
	><svelte:element {id} {...rest} this={ele} >{@render children()}</svelte:element><a class="sl-anchor-link" href={`#${id}`}
		><span aria-hidden="true" class="sl-anchor-icon"
			><svg width="16" height="16" viewBox="0 0 24 24"
				><path
					fill="currentcolor"
					d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z"
				></path></svg
			></span
		><span class="sr-only" data-pagefind-ignore="" >{@render children()}</span></a
	></div
>