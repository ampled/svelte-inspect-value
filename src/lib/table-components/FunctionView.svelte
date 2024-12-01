<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Function>

  let { value = () => {}, key, type }: Props = $props()

  let funcBody = $derived.by(() => {
    const str = value.toString()
    // console.log(str);
    if (str.startsWith('(')) {
      return str
    }
  })

  // $inspect(funcBody)
</script>

<Key {key} />
<Type {type} />
<span class="value {type}">{value.name}</span>
{#if funcBody}{funcBody}{:else}{'{ ... }'}{/if}
