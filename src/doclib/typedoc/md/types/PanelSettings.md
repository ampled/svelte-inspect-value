---
title:
  - panel-settings
  - PanelSettings
children:
  - - align
    - align
  - - appearance
    - appearance
  - - opacity
    - opacity
  - - open
    - open
---

# PanelSettings

```ts
type PanelSettings = {
  align: PositionProp;
  appearance: "solid" | "glassy" | "floating" | "dense";
  opacity: boolean;
  open: boolean;
};
```

Props / settings that can be changed within the `Inspect.Panel` UI.

## Properties

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

***

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

***

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

***

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
