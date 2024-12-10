<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { TypeViewProps } from './types.js'
  import OneLineView from './components/OneLineView.svelte'

  let { ...rest }: TypeViewProps<any> & { val?: Snippet } = $props()
</script>

<OneLineView {...rest} />
