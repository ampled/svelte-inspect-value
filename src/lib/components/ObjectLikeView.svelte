<script lang="ts">
  import type { Snippet } from 'svelte'
  import TitleBar from './TitleBar.svelte'
  import type { TypeViewProps } from '$lib/types.js'

  type Props = TypeViewProps<any> & {
    val?: Snippet
    children?: Snippet
    length?: number
  }

  let props: Props = $props()
</script>

<TitleBar {...props} />
