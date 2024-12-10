<script lang="ts">
  import { setContext, type Snippet } from 'svelte'
  import { createState, STATE_CONTEXT_KEY, type InspectState } from './state.svelte.js'
  import type { JSONInspectOptions } from './options.svelte.js'

  type Props = {
    initialState?: InspectState
    name?: string
    options: JSONInspectOptions
    children: Snippet
  }

  const { initialState, children, name }: Props = $props()

  const inspectState = createState(initialState, '[svelte-value-inspect]' + (name ?? ''))

  setContext(STATE_CONTEXT_KEY, inspectState)
</script>

<!-- {#if initialState} -->
{@render children()}
<!-- {/if} -->
