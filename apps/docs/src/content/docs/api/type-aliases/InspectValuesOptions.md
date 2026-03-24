---
editUrl: false
next: false
prev: false
title: "InspectValuesOptions"
---

```ts
type InspectValuesOptions = () => Partial<InspectOptions> & {
  elementAttributes?: SvelteHTMLElements["div"];
};
```

Defined in: [types.ts:340](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/types.ts#L340)

Options for `Inspect.Values`

Includes `elementAttributes` for setting HTML-attributes on the element without using props.

## Returns
