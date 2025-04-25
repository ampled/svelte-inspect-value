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
  heading: string | Snippet<[]>;
  name: string;
  value: unknown;
  values: unknown;
} & Partial<InspectOptions> & SvelteHTMLElements["aside"];
```

Props for `Inspect.Panel`

## Type declaration

### align?

```ts
optional align: PositionProp;
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
optional appearance: "solid" | "glassy" | "floating" | "dense";
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
optional children: Snippet;
```

Extra elements to be added at the bottom of the panel

### hideGlobalValues?

```ts
optional hideGlobalValues: boolean;
```

Don't display "global" values added with `addToPanel`

#### Default

```ts
false
```

### hideToolbar?

```ts
optional hideToolbar: boolean;
```

Don't render Panel toolbar with controls for setting position, opacity and appearance

#### Default

```ts
false
```

### onOpenChange()?

```ts
optional onOpenChange: (open: boolean) => void;
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
optional opacity: boolean;
```

Apply opacity to the panel when not hovered or focused

**Bindable**

#### Default

```ts
false
```

### open?

```ts
optional open: boolean;
```

Initially open panel

**Bindable**

#### Default

```ts
false
```

### openOnHover?

```ts
optional openOnHover: boolean;
```

Panel should open on hover.

Enabling this will leave part of the panel visible for easier reach.

#### Default

```ts
false
```

### resize?

```ts
optional resize: boolean;
```

Enable resizing

#### Default

```ts
true
```

### wiggleOnUpdate?

```ts
optional wiggleOnUpdate: boolean;
```

When closed, wiggle the panel button when an inspected value is updated

#### Default

```ts
true
```

### zIndex?

```ts
optional zIndex: number;
```

Z-index of panel

#### Default

```ts
1000
```

## Type declaration

### heading?

```ts
optional heading: string | Snippet<[]>;
```

A `string` or `Snippet` that will be rendered as a small heading with a collapse-button for the component.

### name?

```ts
optional name: string;
```

Name of inspected value. Will be displayed as the "key" of the value.

Will not be used if [`BaseProps.values`](InspectProps) is set

#### See

[`InspectOptions.expandPaths`](InspectOptions#expandpaths)

### value?

```ts
optional value: unknown;
```

Any (single) value of any type to be inspected.

Will not be inspected if [`BaseProps.values`](InspectProps) is used

If value is `undefined` or `null` without [`BaseProps.name`](InspectProps) being set,
the value will not be inspected

### values?

```ts
optional values: unknown;
```

Inspect every enumerable property of a value, object or array-like.

Allows for multiple root-level nodes, unlike [`BaseProps.value`](InspectProps).

## See

[InspectOptions](InspectOptions)
