---
editUrl: false
next: false
prev: false
title: "CustomComponentProps"
---

```ts
type CustomComponentProps<T, Type, ExtraProps> = TypeViewProps<T, Type> & ExtraProps;
```

Defined in: [types.ts:416](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/types.ts#L416)

Props received by custom components.
Define extra props using third generic parameter

## Type Parameters

### T

`T` = `unknown`

### Type

`Type` = `string` \| `undefined`

### ExtraProps

`ExtraProps` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

## See

[`TypeViewProps`](/api/type-aliases/typeviewprops/)
