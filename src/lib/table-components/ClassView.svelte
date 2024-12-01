<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import ObjectView from './ObjectView.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Function>

  let { value = class Foo {}, key, type }: Props = $props()
</script>

<Key {key} />
<Type {type} />
<span class="value {type}">
  {value.name}
</span>
{'{ ... }'}

<!-- <ObjectView {value} {key} {type} /> -->
