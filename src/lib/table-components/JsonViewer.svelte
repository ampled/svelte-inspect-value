<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import { getType, type VType } from '../util.js'
  import Noop from './Noop.svelte'
  import components from './types.js'

  type Props = TypeViewProps<any>

  let { value = undefined, key = undefined }: Props = $props()

  let type: VType = $derived(getType(value))

  let TypeComponent = $derived(components[type] ?? Noop)
</script>

<TypeComponent {value} {key} {type} />
