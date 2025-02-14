<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import type { Snippet } from 'svelte'

  type RowProps = TypeViewProps & {
    indicator: Snippet<[expandable: boolean]>
  }

  let props: RowProps = $props()
</script>

<div></div>
