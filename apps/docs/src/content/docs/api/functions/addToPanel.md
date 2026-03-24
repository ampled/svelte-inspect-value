---
editUrl: false
next: false
prev: false
title: "addToPanel"
---

```ts
function addToPanel(
   name, 
   val, 
   addedBy?): () => void;
```

Defined in: [global.svelte.ts:78](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/global.svelte.ts#L78)

Register a "global" value to be inspected with `Inspect.Panel`.
It is recommended to call this during component initialization.

Returns a function that removes the added value when called.

If called during component initialization, the value will automatically be removed when the component is unmounted.

If called after component initialization (i.e. on click) the returned remove-function should be called when the component is destroyed.
If not, value will lose reactivity and may cause weird side-effects or throw errors.

Can also safely be run inside an $effect that will re-add the value if removed and it changes.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

## Parameters

### name

`PropertyKey`

Display name of inspected value

### val

() => `unknown`

Function returning value to be inspected

### addedBy?

`string`

(Optional) label of where value was added from

## Returns

Function that removes added value when called. Returns `true` if value was removed, `false` if value didn't exist

```ts
(): void;
```

### Returns

`void`

## Example

```svelte
<script>
 import {onDestroy} from 'svelte'
 import Inspect, {addToPanel} from 'svelte-inspect-value'

 let value = $state('test')
 let anObject = $state({})
 let anotherValue = $state(123)

 // call during initialization
 // will be removed when this component is destroyed.
 addToPanel('a', () => value)

 $effect(() => {
   // re-set the value if it changes
   // will be removed when this component is destroyed.
   addToPanel('b', () => anObject)
 })

 let remove;
 function add() {
   // called after initialization. value will not be removed
   remove = addToPanel('b', () => anotherValue)
 }

 onDestroy(() => {
   if(remove) remove?.()
 })
</script>

<button onclick={add}>add</button>

```
