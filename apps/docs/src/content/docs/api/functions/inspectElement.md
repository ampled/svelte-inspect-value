---
editUrl: false
next: false
prev: false
title: "inspectElement"
---

```ts
function inspectElement(name?): Attachment;
```

Defined in: [attachments/inspect-element.ts:14](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/attachments/inspect-element.ts#L14)

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
