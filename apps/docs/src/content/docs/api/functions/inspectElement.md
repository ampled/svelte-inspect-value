---
editUrl: false
next: false
prev: false
title: 'inspectElement'
---

```ts
function inspectElement(name?): Attachment
```

Inspect an element with `Inspect.Panel`

## Parameters

### name?

`string`

key of element in `Inspect.Panel` global values. Defaults to `node.nodeName`

## Returns

`Attachment`

## Example

```svelte
<input bind:value={amount} type="number" {@attach inspectElement('amountInput')} />
```
