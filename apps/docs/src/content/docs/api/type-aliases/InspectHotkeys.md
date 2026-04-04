---
editUrl: false
next: false
prev: false
title: "InspectHotkeys"
---

```ts
type InspectHotkeys = {
  search: string | false;
  expandTop: string | false;
  collapseTop: string | false;
};
```

Defined in: [options.svelte.ts:32](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/options.svelte.ts#L32)

Hotkeys configuration using [tinykeys](https://github.com/jamiebuilds/tinykeys) syntax.

Note: The string `'$mod'` means "command" on macOS and "ctrl" on Windows / Linux

## Example

```svelte
<Inspect hotkeys={{
 expandTop: 'Shift+$mod+ArrowUp', // override
 collapseTop: false // disable
 // search: '' // keeps default if omitted
}} />
```

## See

[InspectOptions.hotkeys](/api/type-aliases/inspectoptions/#hotkeys)

## Properties

### search

```ts
search: string | false;
```

Defined in: [options.svelte.ts:38](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/options.svelte.ts#L38)

Hotkey for focusing search field if [`search`](/api/type-aliases/inspectoptions/#search) is enabled

#### Default

```ts
'Shift+$mod+F'
```

***

### expandTop

```ts
expandTop: string | false;
```

Defined in: [options.svelte.ts:44](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/options.svelte.ts#L44)

Hotkey for expanding all top level nodes

#### Default

```ts
'$mod+ArrowRight'
```

***

### collapseTop

```ts
collapseTop: string | false;
```

Defined in: [options.svelte.ts:50](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/options.svelte.ts#L50)

Hotkey for collapsing all top level nodes

#### Default

```ts
'$mod+ArrowLeft'
```
