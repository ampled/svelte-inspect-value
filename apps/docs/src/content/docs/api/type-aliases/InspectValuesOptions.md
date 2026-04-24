---
editUrl: false
next: false
prev: false
title: 'InspectValuesOptions'
---

```ts
type InspectValuesOptions = () => Partial<InspectOptions> & {
  elementAttributes?: SvelteHTMLElements['div']
}
```

Options for `Inspect.Values`

Includes `elementAttributes` for setting HTML-attributes on the element without using props.

## Returns
