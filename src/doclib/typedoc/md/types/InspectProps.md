---
title:
  - inspect-props
  - InspectProps
---

# InspectProps

```ts
type InspectProps = {
  heading: string | Snippet<[]>;
  name: string;
  value: unknown;
  values: unknown;
} & Partial<InspectOptions> & SvelteHTMLElements["div"];
```

Props for `Inspect`

## Type declaration

### heading?

```ts
heading: string | Snippet<[]>;
```

A `string` or `Snippet` that will be rendered as a small heading with a collapse-button for the component.

### name?

```ts
name: string;
```

Name of inspected value. Will be displayed as the "key" of the value.

Will not be used if `BaseProps.values` is set

#### See

[`InspectOptions.expandPaths`](InspectOptions#expandpaths)

### value?

```ts
value: unknown;
```

Any (single) value of any type to be inspected.

Will not be inspected if `BaseProps.values` is used

If value is `undefined` or `null` without `BaseProps.name` being set,
the value will not be inspected

### values?

```ts
values: unknown;
```

Inspect every enumerable property of a value, object or array-like.

Allows for multiple root-level nodes, unlike `BaseProps.value`.

## See

[InspectOptions](InspectOptions)
