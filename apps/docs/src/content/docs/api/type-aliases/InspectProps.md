---
editUrl: false
next: false
prev: false
title: "InspectProps"
---

```ts
type InspectProps = {
  value?: unknown;
  values?: unknown;
  name?: string;
} & Partial<InspectOptions> & SvelteHTMLElements["div"];
```

Defined in: [types.ts:43](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L43)

Props for `Inspect`

## Type Declaration

### value?

```ts
optional value?: unknown;
```

Any (single) value of any type to be inspected.

Will not be inspected if BaseProps.values is used

If value is `undefined` or `null` without `name` being set,
the value will not be inspected

### values?

```ts
optional values?: unknown;
```

Inspect every enumerable property of a value, object or array-like.

Allows for multiple root-level nodes, unlike `value`.

### name?

```ts
optional name?: string;
```

Name of inspected value. Will be displayed as the "key" of the value.

Will not be used if `values` is set

#### See

[`InspectOptions.expandPaths`](/api/type-aliases/inspectoptions/#expandpaths)

## See

[InspectOptions](/api/type-aliases/inspectoptions/)
