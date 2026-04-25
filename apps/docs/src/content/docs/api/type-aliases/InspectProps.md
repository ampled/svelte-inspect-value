---
editUrl: false
next: false
prev: false
title: 'InspectProps'
---

```ts
type InspectProps = {
  name?: string
  value?: unknown
  values?: unknown
} & Partial<InspectOptions> &
  SvelteHTMLElements['div']
```

Props for `Inspect`

## Type Declaration

### name?

```ts
optional name?: string;
```

Name of inspected value. Will be displayed as the "key" of the value.

Will not be used if `values` is set

#### See

[`InspectOptions.expandPaths`](/api/type-aliases/inspectoptions/#expandpaths)

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

## See

[InspectOptions](/api/type-aliases/inspectoptions/)
