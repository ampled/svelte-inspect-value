<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import StringView from './StringView.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Error>

  let { value = new Error(''), key, type }: Props = $props()
</script>

<StringView value={value.toString()} {key} {type} />
