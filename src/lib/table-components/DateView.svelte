<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { stringify } from '$lib/util.js'
  import Key from './Key.svelte'
  import StringView from './StringView.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Date>

  let { value = new Date(), key, type }: Props = $props()
</script>

<StringView value={stringify(value).replaceAll('"', '')} {key} {type} />
