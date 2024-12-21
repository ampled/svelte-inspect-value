<script lang="ts">
  import { setContext, type Snippet } from 'svelte'
  import { createState, STATE_CONTEXT_KEY, type InspectState } from './state.svelte.js'
  import type { JSONInspectOptions } from './options.svelte.js'

  type Props = {
    initialState?: InspectState
    name?: string
    options: JSONInspectOptions
    children: Snippet
    onChange?: (value: InspectState) => void
  }

  const { children, name, onChange }: Props = $props()

  const inspectState = createState({}, '[svelte-value-inspect]' + (name ?? ''), onChange)

  setContext(STATE_CONTEXT_KEY, inspectState)
</script>

{@render children()}
