---
title:
  - custom-component-predicate
  - CustomComponentPredicate
---

# CustomComponentPredicate() `<` TComponent `>` 

```ts
type CustomComponentPredicate<TComponent> = (props: ComponentProps<TComponent>) => boolean;
```

Function returning boolean value. If false, use default component.

## Type Parameters

### TComponent

`TComponent` `extends` `Component` `<` `any` `>` 

## Parameters

### props

`ComponentProps` `<` `TComponent` `>` 

## Returns

`boolean`
