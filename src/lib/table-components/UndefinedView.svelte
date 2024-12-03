<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<undefined>

  let { key, type }: Props = $props()
</script>

<OneLineView {key} {type} />
