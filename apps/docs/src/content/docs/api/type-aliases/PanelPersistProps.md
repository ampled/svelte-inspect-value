---
editUrl: false
next: false
prev: false
title: 'PanelPersistProps'
---

```ts
type PanelPersistProps = {
  key?: string
  storage?: 'local' | 'session'
  syncTabs?: boolean
}
```

Options for persisting `Inspect.Panel` state or configuration using the Panel UI.

## Properties

### key?

```ts
optional key?: string;
```

Storage key used with local/session storage

#### Default

```ts
'siv.panel'
```

---

### storage?

```ts
optional storage?: "local" | "session";
```

The storage type to use.

#### Default

```ts
'local'
```

---

### syncTabs?

```ts
optional syncTabs?: boolean;
```

Enable or disable syncing the state changes from other tabs.

#### Default

```ts
false
```
