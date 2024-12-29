<script lang="ts">
  import Inspect from '$lib/Inspect.svelte'
  import CustomString from './String.svelte'

  let typedArr = $state(new Int16Array(3))

  let anObject = $state({
    aString: 'some string',
    // errorsWithCauses: new Error('testing', {
    //   cause: new Error('i am what happened', { cause: new Error('no i am spartacus') }),
    // }),
    counter: 0,
    // arrayIterator: [1, 2, 3].values(),
    setIterator: new Set([1, 2, 3]).entries(),
    // mapIterator: new SvelteMap([['key', 'string']]).entries(),
    typedArr,
    asf: (function* () {
      yield* [1, 2, 3]
    })(),
    // generator,
  })
</script>

<input type="text" bind:value={anObject.aString} />
<input type="number" bind:value={anObject.counter} />

<Inspect
  theme="drak"
  value={anObject}
  customComponents={{ string: [CustomString] }}
  name="anObject"
/>
