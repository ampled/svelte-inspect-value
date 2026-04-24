---
editUrl: false
next: false
prev: false
title: 'PanelSettings'
---

```ts
type PanelSettings = {
  align: PositionProp
  appearance: 'solid' | 'glassy' | 'floating' | 'dense'
  height?: number
  opacity: boolean
  open: boolean
  width?: number
}
```

Props / settings that can be changed within the `Inspect.Panel` UI.

These can be persisted using built-in logic with `persist` or
customized logic using the `onSettingsChange`-callback

## See

- PanelProps.persist
- PanelProps.onSettingsChange

## Properties

### align

```ts
align: PositionProp
```

Initial panel position

Format: `'<x-position> <y-position?>'` (y is optional)

x-position can be one of `'left' | 'right' | 'center' | 'full'`

y-position can be one of `'top' | 'bottom' | 'middle' | 'full'`

_Note: if only x-position is given it can only be `'left'` or `'right'`_

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

---

### appearance

```ts
appearance: 'solid' | 'glassy' | 'floating' | 'dense'
```

Sets appearance of panel.

Can be `'solid'|'glassy'|'dense'|'floating'`

**Bindable**

#### Default

```ts
'solid'
```

---

### height?

```ts
optional height?: number;
```

Panel height in pixels

Not used if y-position in `align` is `'full'`

**Bindable**

#### Default

```ts
undefined
```

---

### opacity

```ts
opacity: boolean
```

Apply opacity to the panel when not hovered or focused

**Bindable**

#### Default

```ts
false
```

---

### open

```ts
open: boolean
```

Initially open panel

**Bindable**

#### Default

```ts
false
```

---

### width?

```ts
optional width?: number;
```

Panel width in pixels.

Not used if x-position in `align` is `'full'`

**Bindable**

#### Default

```ts
undefined
```
