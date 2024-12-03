<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<null>

  let props: Props = $props()
</script>

<OneLineView {...props} />
