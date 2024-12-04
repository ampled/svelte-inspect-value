<script lang="ts">
  import { setContext, type Snippet } from 'svelte'
  import { createState, STATE_CONTEXT_KEY, type InspectState } from './state.svelte.js'
  import type { JSONInspectOptions } from './options.svelte.js'

  type Props = {
    initialState: InspectState
    options: JSONInspectOptions
    children: Snippet
  }

  const { initialState, children }: Props = $props()

  const inspectState = createState(initialState)

  setContext(STATE_CONTEXT_KEY, inspectState)
</script>

{@render children()}
