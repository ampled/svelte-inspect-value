---
editUrl: false
next: false
prev: false
title: "PanelPersistProps"
---

```ts
type PanelPersistProps = {
  key?: string;
  storage?: "local" | "session";
  syncTabs?: boolean;
};
```

Defined in: [types.ts:68](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L68)

Options for persisting `Inspect.Panel` state or configuration using the Panel UI.

## Properties

### key?

```ts
optional key?: string;
```

Defined in: [types.ts:74](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L74)

Storage key used with local/session storage

#### Default

```ts
'siv.panel'
```

***

### storage?

```ts
optional storage?: "local" | "session";
```

Defined in: [types.ts:79](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L79)

The storage type to use.

#### Default

```ts
'local'
```

***

### syncTabs?

```ts
optional syncTabs?: boolean;
```

Defined in: [types.ts:84](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L84)

Enable or disable syncing the state changes from other tabs.

#### Default

```ts
false
```
