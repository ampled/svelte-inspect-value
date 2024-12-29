<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'

  // let value = $state<string | number>('stringValue')

  let obj = $state({
    value: 'str',
    arr: [1],
  })
</script>

<button onclick={() => (obj.value = 'stringValue')}>string</button>
<button onclick={() => (obj.value = 2 as any)}>number</button>
<button
  onclick={() => {
    // obj.arr.push(obj.arr.length + 1)
    obj.arr = [...obj.arr, obj.arr.length + 1]
  }}>add</button
>
<button onclick={() => (obj.arr = obj.arr.filter((v) => v != obj.arr.length))}>remove</button>

<Inspect value={obj} />
