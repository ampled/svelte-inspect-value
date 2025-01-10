<script lang="ts" generics="T = unknown">
  import type { Snippet } from 'svelte'
  import Expandable from './components/Expandable.svelte'
  import type { CustomComponentProps } from './types.js'

  let { ...props }: CustomComponentProps<T> & { val: Snippet } = $props()
</script>

<Expandable {...props} />
