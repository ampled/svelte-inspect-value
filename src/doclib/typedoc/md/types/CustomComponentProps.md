---
title:
  - custom-component-props
  - CustomComponentProps
---

# CustomComponentProps `<` T, Type, ExtraProps `>` 

```ts
type CustomComponentProps<T, Type, ExtraProps> = TypeViewProps<T, Type> & ExtraProps;
```

Props received by custom components.
Define extra props using third generic parameter

## Type Parameters

### T

`T` = `unknown`

### Type

`Type` = `string` \| `undefined`

### ExtraProps

`ExtraProps` `extends` `Record` `<` `string`, `any` `>`  = `Record` `<` `string`, `any` `>` 

## See

[`TypeViewProps`](TypeViewProps)
