<script lang="ts">
  import type { TypeViewProps } from '$lib/types.js'
  import Expandable from './Expandable.svelte'
  import FunctionBody from './FunctionBody.svelte'
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
</script>

<Expandable {key} {type} {path} {value} length={1} showLength={false}>
  {#snippet val()}
    <span class="value {type}">
      {value.name}
      <span class="funcbody">
        {#if funcBody}{funcBody}{:else}{'{ ... }'}{/if}
      </span>
    </span>
  {/snippet}
  <FunctionBody value={value.toString()} />
</Expandable>
