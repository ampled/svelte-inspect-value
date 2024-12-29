<script lang="ts">
  import type { ComponentProps } from 'svelte'
  import OneLineView from './components/OneLineView.svelte'

  let { ...props }: ComponentProps<typeof OneLineView> = $props()
</script>

<OneLineView {...props} />
