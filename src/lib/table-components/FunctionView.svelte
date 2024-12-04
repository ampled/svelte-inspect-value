<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Key from './Key.svelte'
  import OneLineView from './OneLineView.svelte'
  import Type from './Type.svelte'

  type Props = TypeViewProps<Function>

  let { value = () => {}, key, type, path }: Props = $props()

  let funcBody = $derived.by(() => {
    const str = value.toString()
    // console.log(str);
    if (str.startsWith('(')) {
      return str
    }
  })
</script>

<OneLineView {key} {type} {path}>
  {#snippet val()}
    <span class="value {type}">
      {value.name}
      <span class="funcbody">
        {#if funcBody}{funcBody}{:else}{'{ ... }'}{/if}
      </span>
    </span>
  {/snippet}
</OneLineView>
