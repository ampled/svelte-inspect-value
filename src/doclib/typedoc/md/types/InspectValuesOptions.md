---
title:
  - inspect-values-options
  - InspectValuesOptions
---

# InspectValuesOptions()

```ts
type InspectValuesOptions = () => Partial<InspectOptions & {
  elementAttributes: SvelteHTMLElements["div"];
}>;
```

Options for `Inspect.Values`

Includes `elementAttributes` for setting HTML-attributes on the element without using props.

## Returns

`Partial` `<` [`InspectOptions`](InspectOptions) &  `{` 
  `elementAttributes`: `SvelteHTMLElements`\[`"div"`\];
 `}`  `>` 
