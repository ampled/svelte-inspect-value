---
title:
  - panel-persist-props
  - PanelPersistProps
children:
  - - key
    - key
  - - storage
    - storage
  - - sync-tabs
    - syncTabs
---

# PanelPersistProps

```ts
type PanelPersistProps = {
  key: string;
  storage: "local" | "session";
  syncTabs: boolean;
};
```

Options for persisting `Inspect.Panel` state or configuration using the Panel UI.

## Properties

### key?

```ts
key: string;
```

Storage key used with local/session storage

#### Default

```ts
'siv.panel'
```

***

### storage?

```ts
storage: "local" | "session";
```

The storage type to use.

#### Default

```ts
'local'
```

***

### syncTabs?

```ts
syncTabs: boolean;
```

Enable or disable syncing the state changes from other tabs.

#### Default

```ts
false
```
