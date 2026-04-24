---
editUrl: false
next: false
prev: false
title: 'CustomComponentProps'
---

```ts
type CustomComponentProps<T, Type, ExtraProps> = TypeViewProps<T, Type> & ExtraProps
```

Props received by custom components.
Define extra props using third generic parameter

## Type Parameters

### T

`T` = `unknown`

### Type

`Type` = `string` \| `undefined`

### ExtraProps

`ExtraProps` _extends_ `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

## See

[`TypeViewProps`](/api/type-aliases/typeviewprops/)
