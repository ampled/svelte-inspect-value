---
title:
  - custom-entry-with-predicate
  - CustomEntryWithPredicate
---

# CustomEntryWithPredicate `<` TComponent `>` 

```ts
type CustomEntryWithPredicate<TComponent> = [TComponent, 
  | CustomComponentPropsTransformFn<TComponent>
  | undefined, CustomComponentPredicate<TComponent>];
```

## Type Parameters

### TComponent

`TComponent` `extends` `Component` `<` `any` `>` 
