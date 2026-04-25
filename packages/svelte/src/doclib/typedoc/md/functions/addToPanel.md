---
title:
  - add-to-panel
  - addToPanel
---

# addToPanel()

```ts
function addToPanel(
   name: PropertyKey, 
   val: () => unknown, 
   addedBy?: string): () => void;
```

**`Experimental`**

Register a "global" value to be inspected with `Inspect.Panel`.
It is recommended to call this during component initialization.

Returns a function that removes the added value when called.

If called during component initialization, the value will automatically be removed when the component is unmounted.

If called after component initialization (i.e. on click) the returned remove-function should be called when the component is destroyed.
If not, value will lose reactivity and may cause weird side-effects or throw errors.

Can also safely be run inside an $effect that will re-add the value if removed and it changes.

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
