<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Expandable from './Expandable.svelte'
  import FunctionBody from './FunctionBody.svelte'
  import OneLineView from './OneLineView.svelte'
  // import OneLineView from './OneLineView.svelte'

  type Props = TypeViewProps<() => unknown>

  let { value = () => {}, key, type, path }: Props = $props()

  let funcBody = $derived.by(() => {
    const str = value.toString()
    return str
    // console.log(str);
    // if (str.startsWith('(')) {
    //   return str
    // }
  })

  let isMultiLine = $derived(funcBody.includes('\n'))
</script>

{#snippet preview()}
  <!-- <span class="value {type}"> -->
  <!-- {value.name} -->
  <!-- <span class="funcbody"> -->
  <!-- {#if funcBody}{funcBody}{:else}{'{ ... }'}{/if} -->
  <FunctionBody value={value.toString()} inline />
  <!-- </span> -->
  <!-- </span> -->
{/snippet}

{#if isMultiLine}
  <Expandable {key} {type} {path} {value} length={1} showLength={false}>
    {#snippet val()}
      <FunctionBody value={value.toString()} inline />
    {/snippet}
    <FunctionBody value={value.toString()} />
  </Expandable>
{:else}
  <OneLineView {key} {type} {path} {value}>
    {#snippet val()}
      <FunctionBody value={value.toString()} inline />
    {/snippet}
  </OneLineView>
{/if}
