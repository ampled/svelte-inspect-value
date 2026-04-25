---
editUrl: false
next: false
prev: false
title: 'InspectHotkeys'
---

```ts
type InspectHotkeys = {
  collapseTop: string | false
  expandTop: string | false
  search: string | false
}
```

Hotkeys configuration using [tinykeys](https://github.com/jamiebuilds/tinykeys) syntax.

Note: The string `'$mod'` means "command" on macOS and "ctrl" on Windows / Linux

## Example

```svelte
<Inspect
  hotkeys={{
    expandTop: 'Shift+$mod+ArrowUp', // override
    collapseTop: false, // disable
    // search: '' // keeps default if omitted
  }}
/>
```

## See

[InspectOptions.hotkeys](/api/type-aliases/inspectoptions/#hotkeys)

## Properties

### collapseTop

```ts
collapseTop: string | false
```

Hotkey for collapsing all top level nodes

#### Default

```ts
'$mod+ArrowLeft'
```

---

### expandTop

```ts
expandTop: string | false
```

Hotkey for expanding all top level nodes

#### Default

```ts
'$mod+ArrowRight'
```

---

### search

```ts
search: string | false
```

Hotkey for focusing search field if [`search`](/api/type-aliases/inspectoptions/#search) is enabled

#### Default

```ts
'Shift+$mod+F'
```
