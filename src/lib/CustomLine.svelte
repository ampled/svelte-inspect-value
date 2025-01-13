<script lang="ts" generics="T = unknown">
  import type { Snippet } from 'svelte'
  import OneLineView from './components/OneLineView.svelte'
  import type { CustomComponentProps } from './types.js'

  let { ...props }: CustomComponentProps<T> & { children?: Snippet } = $props()
</script>

<OneLineView {...props} />
