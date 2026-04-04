---
editUrl: false
next: false
prev: false
title: "PanelSettings"
---

```ts
type PanelSettings = {
  align: PositionProp;
  open: boolean;
  appearance: "solid" | "glassy" | "floating" | "dense";
  opacity: boolean;
  width?: number;
  height?: number;
};
```

Defined in: [types.ts:96](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L96)

Props / settings that can be changed within the `Inspect.Panel` UI.

These can be persisted using built-in logic with `persist` or
customized logic using the `onSettingsChange`-callback

## See

 - PanelProps.persist
 - PanelProps.onSettingsChange

## Properties

### align

```ts
align: PositionProp;
```

Defined in: [types.ts:118](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L118)

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

### open

```ts
open: boolean;
```

Defined in: [types.ts:125](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L125)

Initially open panel

**Bindable**

#### Default

```ts
false
```

***

### appearance

```ts
appearance: "solid" | "glassy" | "floating" | "dense";
```

Defined in: [types.ts:134](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L134)

Sets appearance of panel.

Can be `'solid'|'glassy'|'dense'|'floating'`

**Bindable**

#### Default

```ts
'solid'
```

***

### opacity

```ts
opacity: boolean;
```

Defined in: [types.ts:142](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L142)

Apply opacity to the panel when not hovered or focused

**Bindable**

#### Default

```ts
false
```

***

### width?

```ts
optional width?: number;
```

Defined in: [types.ts:151](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L151)

Panel width in pixels.

Not used if x-position in `align` is `'full'`

**Bindable**

#### Default

```ts
undefined
```

***

### height?

```ts
optional height?: number;
```

Defined in: [types.ts:160](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L160)

Panel height in pixels

Not used if y-position in `align` is `'full'`

**Bindable**

#### Default

```ts
undefined
```
