---
title:
  - panel-props
  - PanelProps
---

# PanelProps

```ts
type PanelProps = {
  align: PositionProp;
  appearance: "solid" | "glassy" | "floating" | "dense";
  children: Snippet;
  hideGlobalValues: boolean;
  hideToolbar: boolean;
  onOpenChange: (open: boolean) => void;
  opacity: boolean;
  open: boolean;
  openOnHover: boolean;
  resize: boolean;
  wiggleOnUpdate: boolean;
  zIndex: number;
} & {
  name: string;
  value: unknown;
  values: unknown;
} & Partial<InspectOptions> & SvelteHTMLElements["aside"];
```

Props for `Inspect.Panel`

## Type declaration

### align?

```ts
align: PositionProp;
```

Initial panel position

Format: `'<x-position> <y-position?>'` (y is optional)

x-position can be one of `'left' | 'right' | 'center' | 'full'`

y-position can be one of `'top' | 'bottom' | 'middle' | 'full'`

*Note: if only x-position is given it can only be `'left'` or `'right'`*

**Bindable**

#### Example

```svelte
<Inspect.Panel align="left">
<Inspect.Panel align="right middle">
<Inspect.Panel align="center top">
```

#### Default

```ts
'right full'
```

### appearance?

```ts
appearance: "solid" | "glassy" | "floating" | "dense";
```

Sets appearance of panel.

Can be `'solid'|'glassy'|'dense'|'floating'`

**Bindable**

#### Default

```ts
'solid'
```

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

### opacity?

```ts
opacity: boolean;
```

Apply opacity to the panel when not hovered or focused

**Bindable**

#### Default

```ts
false
```

### open?

```ts
open: boolean;
```

Initially open panel

**Bindable**

#### Default

```ts
false
```

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
