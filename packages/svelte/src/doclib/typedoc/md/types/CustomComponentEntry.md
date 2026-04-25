---
title:
  - custom-component-entry
  - CustomComponentEntry
---

# CustomComponentEntry `<` TComponent `>` 

```ts
type CustomComponentEntry<TComponent> = 
  | CustomEntryComponentOnly<TComponent>
  | CustomEntryWithTransform<TComponent>
| CustomEntryWithPredicate<TComponent>;
```

## Type Parameters

### TComponent

`TComponent` `extends` `Component` `<` `any` `>`  = `Component` `<` `any` `>` 
