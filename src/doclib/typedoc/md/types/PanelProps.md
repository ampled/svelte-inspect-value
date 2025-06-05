---
title:
  - panel-props
  - PanelProps
---

# PanelProps

```ts
type PanelProps = {
  children: Snippet;
  hideGlobalValues: boolean;
  hideToolbar: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsChange: (settings: Required<PanelSettings>) => void;
  openOnHover: boolean;
  resize: boolean;
  wiggleOnUpdate: boolean;
  zIndex: number;
} & {
  name: string;
  value: unknown;
  values: unknown;
} & PanelSettings & Partial<InspectOptions> & SvelteHTMLElements["aside"];
```

Props for `Inspect.Panel`

## Type declaration

### children?

```ts
children: Snippet;
```

Extra elements to be added at the bottom of the panel

### hideGlobalValues?

```ts
hideGlobalValues: boolean;
```

Don't display "global" values added with `addToPanel`

#### Default

```ts
false
```

### hideToolbar?

```ts
hideToolbar: boolean;
```

Don't render Panel toolbar with controls for setting position, opacity and appearance

#### Default

```ts
false
```

### onOpenChange()?

```ts
onOpenChange: (open: boolean) => void;
```

Callback for when panel is opened or closed

#### Parameters

##### open

`boolean`

#### Returns

`void`

#### Default

```ts
undefined
```

### onSettingsChange()?

```ts
onSettingsChange: (settings: Required<PanelSettings>) => void;
```

Callback for when any panel prop/setting is changed with the panel UI. Can be used for
persisting settings using `localStorage`

Will run when any of the following prop / setting is changed:

- `open`
- `align`
- `appearance`
- `opacity`

#### Parameters

##### settings

`Required` `<` [`PanelSettings`](PanelSettings) `>` 

Current value of settings

#### Returns

`void`

#### Default

```ts
undefined
```

#### See

[PanelSettings](PanelSettings)

### openOnHover?

```ts
openOnHover: boolean;
```

Panel should open on hover.

Enabling this will leave part of the panel visible for easier reach.

#### Default

```ts
false
```

### resize?

```ts
resize: boolean;
```

Enable resizing

#### Default

```ts
true
```

### wiggleOnUpdate?

```ts
wiggleOnUpdate: boolean;
```

When closed, wiggle the panel button when an inspected value is updated

#### Default

```ts
true
```

### zIndex?

```ts
zIndex: number;
```

Z-index of panel

#### Default

```ts
1000
```

## Type declaration

### name?

```ts
name: string;
```

Name of inspected value. Will be displayed as the "key" of the value.

Will not be used if [`BaseProps.values`](InspectProps) is set

#### See

[`InspectOptions.expandPaths`](InspectOptions#expandpaths)

### value?

```ts
value: unknown;
```

Any (single) value of any type to be inspected.

Will not be inspected if [`BaseProps.values`](InspectProps) is used

If value is `undefined` or `null` without [`BaseProps.name`](InspectProps) being set,
the value will not be inspected

### values?

```ts
values: unknown;
```

Inspect every enumerable property of a value, object or array-like.

Allows for multiple root-level nodes, unlike [`BaseProps.value`](InspectProps).

## See

[InspectOptions](InspectOptions)
