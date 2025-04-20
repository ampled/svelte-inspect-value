<!--
@component CollapseStateProvider

Initializes collapse state
-->
<script lang="ts">
  import { setContext, type Snippet } from 'svelte'
  import type { InspectOptions } from './options.svelte.js'
  import { createState, STATE_CONTEXT_KEY } from './state.svelte.js'

  type Props = { children: Snippet; onCollapseChange: InspectOptions['onCollapseChange'] }

  const { children, onCollapseChange }: Props = $props()
  const initState = $state({})
  const inspectState = createState(initState, (state) => onCollapseChange?.(state))

  setContext(STATE_CONTEXT_KEY, inspectState)
</script>

{@render children()}
