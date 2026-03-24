---
editUrl: false
next: false
prev: false
title: "addComponent"
---

```ts
function addComponent<TComponent>(
   component, 
   transformProps?, 
predicate?): CustomComponentEntry<TComponent>;
```

Defined in: [util.ts:381](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/util.ts#L381)

Helper-function for adding custom components with a props transform function.

The function ensures proper typing for the props parameter of the transform / predicate functions

## Type Parameters

### TComponent

`TComponent` *extends* `Component`\<`any`, \{
\}, `string`\> = `Component`\<`any`, \{
\}, `string`\>

## Parameters

### component

`TComponent`

Custom component

### transformProps?

`CustomComponentPropsTransformFn`\<`TComponent`\>

Function modifying props passed to component

### predicate?

`CustomComponentPredicate`\<`TComponent`\>

Function returning boolean value. If false, use default component.

## Returns

`CustomComponentEntry`\<`TComponent`\>

## Example

```svelte
<script lang="ts">
 import {Inspect, addComponent} from 'svelte-inspect-value';
 import CustomNumber from './CustomNumber.svelte';
 import CustomString from './CustomString.svelte';
</script>

<Inspect value={1234} customComponents={{
  number: addComponent(
   CustomNumber,
   // props here is properly typed with props of CustomNumber
   (props) => ({ value: Math.floor(props.value) })
   // third parameter is a predicate function that decides if custom component should be used
   // if false is returned, the default component will be used instead for this type
   (props) => props.value < 1000
  ),
  // custom component without props transform function or predicate
  string: [CustomString]
 }}
/>
```
