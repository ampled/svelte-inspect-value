---
title:
  - panel-props
  - PanelProps
children:
  - - children
    - children
  - - hide-global-values
    - hideGlobalValues
  - - hide-toolbar
    - hideToolbar
  - - on-open-change
    - onOpenChange
  - - on-settings-change
    - onSettingsChange
  - - open-on-hover
    - openOnHover
  - - persist
    - persist
  - - persist-sync
    - persistSync
  - - resize
    - resize
  - - wiggle-on-update
    - wiggleOnUpdate
  - - z-index
    - zIndex
  - - name
    - name
  - - value
    - value
  - - values
    - values
---

# PanelProps

```ts
type PanelProps = {
  children: Snippet;
  hideGlobalValues: boolean;
  hideToolbar: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsChange: (settings: PanelSettings, changed: keyof PanelSettings[]) => void;
  openOnHover: boolean;
  persist: boolean | string | PanelPersistProps;
  persistSync: boolean
     | string
     | Omit<PanelPersistProps, "syncTabs">;
  resize: boolean;
  wiggleOnUpdate: boolean;
  zIndex: number;
} & {
  name: string;
  value: unknown;
  values: unknown;
} & Partial<PanelSettings> & Partial<InspectOptions> & SvelteHTMLElements["aside"];
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
onSettingsChange: (settings: PanelSettings, changed: keyof PanelSettings[]) => void;
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

[`PanelSettings`](PanelSettings)

Current value of settings

##### changed

keyof [`PanelSettings`](PanelSettings)[]

Keys of changed settings

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

### persist?

```ts
persist: boolean | string | PanelPersistProps;
```

Enable/disable persistence of [`PanelSettings`](PanelSettings) using localStorage or sessionStorage
when changed through Panel UI, e.g. open/closed state, width, height, appearance, alignment and opacity setting.

When enabled, stored settings will take precedence over passed props.

Pass a configuration object ([PanelPersistProps](PanelPersistProps)), `true` or a string (storage key) to enable.

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

[PanelPersistProps](PanelPersistProps)

### persistSync?

```ts
persistSync: 
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
 - [PanelPersistProps.syncTabs](PanelPersistProps#synctabs)

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
