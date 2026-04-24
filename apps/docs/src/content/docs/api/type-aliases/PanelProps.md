---
editUrl: false
next: false
prev: false
title: 'PanelProps'
---

```ts
type PanelProps = {
  children?: Snippet
  hideGlobalValues?: boolean
  hideToolbar?: boolean
  onOpenChange?: (open) => void
  onSettingsChange?: (settings, changed) => void
  openOnHover?: boolean
  persist?: boolean | string | PanelPersistProps
  persistSync?: boolean | string | Omit<PanelPersistProps, 'syncTabs'>
  resize?: boolean
  wiggleOnUpdate?: boolean
  zIndex?: number
} & {
  name?: string
  value?: unknown
  values?: unknown
} & Partial<PanelSettings> &
  Partial<InspectOptions> &
  SvelteHTMLElements['aside']
```

Props for `Inspect.Panel`

## Type Declaration

### children?

```ts
optional children?: Snippet;
```

Extra elements to be added at the bottom of the panel

### hideGlobalValues?

```ts
optional hideGlobalValues?: boolean;
```

Don't display "global" values added with `addToPanel`

#### Default

```ts
false
```

### hideToolbar?

```ts
optional hideToolbar?: boolean;
```

Don't render Panel toolbar with controls for setting position, opacity and appearance

#### Default

```ts
false
```

### onOpenChange?

```ts
optional onOpenChange?: (open) => void;
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

### onSettingsChange?

```ts
optional onSettingsChange?: (settings, changed) => void;
```

Callback for when any panel prop/setting is changed with the panel UI. Can be used for
customized persisting of settings using `localStorage`

Will run when any of the following prop / setting is changed:

- `open`
- `align`
- `appearance`
- `opacity`
- `width` and `height` (if resizing is enabled)

#### Parameters

##### settings

[`PanelSettings`](/api/type-aliases/panelsettings/)

Current value of settings

##### changed

keyof [`PanelSettings`](/api/type-aliases/panelsettings/)[]

Keys of changed settings

#### Returns

`void`

#### Default

```ts
undefined
```

#### See

[PanelSettings](/api/type-aliases/panelsettings/)

### openOnHover?

```ts
optional openOnHover?: boolean;
```

Panel should open on hover.

Enabling this will leave part of the panel visible for easier reach.

#### Default

```ts
false
```

### persist?

```ts
optional persist?:
  | boolean
  | string
  | PanelPersistProps;
```

Enable/disable persistence of [`PanelSettings`](/api/type-aliases/panelsettings/) using localStorage or sessionStorage
when changed through Panel UI, e.g. open/closed state, width, height, appearance, alignment and opacity setting.

When enabled, stored settings will take precedence over passed props.

Pass a configuration object ([PanelPersistProps](/api/type-aliases/panelpersistprops/)), `true` or a string (storage key) to enable.

Passing `true` will enable persistence and using these default options:

```typescript
{
 storage: 'local',
 key: 'siv.panel',
 syncTabs: false
}
```

Passing a string will use those defaults but use the passed string as the key

#### Default

```ts
false
```

#### See

[PanelPersistProps](/api/type-aliases/panelpersistprops/)

### persistSync?

```ts
optional persistSync?:
  | boolean
  | string
| Omit<PanelPersistProps, "syncTabs">;
```

Alias for `persist` except tab syncing is always enabled.

If `persist` is truthy this prop will not have any effect.

#### Default

```ts
false
```

#### See

- PanelProps.persist
- [PanelPersistProps.syncTabs](/api/type-aliases/panelpersistprops/#synctabs)

### resize?

```ts
optional resize?: boolean;
```

Enable resizing

#### Default

```ts
true
```

### wiggleOnUpdate?

```ts
optional wiggleOnUpdate?: boolean;
```

When closed, wiggle the panel button when an inspected value is updated

#### Default

```ts
true
```

### zIndex?

```ts
optional zIndex?: number;
```

Z-index of panel

#### Default

```ts
1000
```

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

- [InspectOptions](/api/type-aliases/inspectoptions/)
- [PanelSettings](/api/type-aliases/panelsettings/)
