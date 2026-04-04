---
editUrl: false
next: false
prev: false
title: "TypeViewProps"
---

```ts
type TypeViewProps<Value, Type> = {
  value: Value;
  key?: PropertyKey;
  keyPrefix?: string;
  showKey?: boolean;
  keyDelim?: string;
  keyStyle?: HTMLAttributes<HTMLDivElement>["style"];
  path?: PropertyKey[];
  display?: string;
  type?: Type;
  forceType?: boolean;
  note?: {
     title?: string;
     description?: string;
  };
  match?: boolean;
  length?: number;
  showLength?: boolean;
};
```

Defined in: [types.ts:278](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L278)

## Type Parameters

### Value

`Value` = `unknown`

### Type

`Type` = [`ValueType`](/api/type-aliases/valuetype/)

## Properties

### value

```ts
value: Value;
```

Defined in: [types.ts:279](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L279)

***

### key?

```ts
optional key?: PropertyKey;
```

Defined in: [types.ts:280](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L280)

***

### keyPrefix?

```ts
optional keyPrefix?: string;
```

Defined in: [types.ts:284](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L284)

Prefix for key e.g. "get" or "static"

***

### showKey?

```ts
optional showKey?: boolean;
```

Defined in: [types.ts:288](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L288)

Should key be shown

***

### keyDelim?

```ts
optional keyDelim?: string;
```

Defined in: [types.ts:292](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L292)

Key delimiter

***

### keyStyle?

```ts
optional keyStyle?: HTMLAttributes<HTMLDivElement>["style"];
```

Defined in: [types.ts:296](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L296)

Style overrides for key

***

### path?

```ts
optional path?: PropertyKey[];
```

Defined in: [types.ts:300](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L300)

Path of the node

***

### display?

```ts
optional display?: string;
```

Defined in: [types.ts:307](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L307)

Representation of value.

Use to customize how a value is represented while still being able to pass the original
value for other purposes

***

### type?

```ts
optional type?: Type;
```

Defined in: [types.ts:311](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L311)

Type of the value

***

### forceType?

```ts
optional forceType?: boolean;
```

Defined in: [types.ts:315](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L315)

Force type indicator visibility for this node

***

### note?

```ts
optional note?: {
  title?: string;
  description?: string;
};
```

Defined in: [types.ts:319](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L319)

Title / description for node note, e.g. "parsed" for parsed JSON strings

#### title?

```ts
optional title?: string;
```

#### description?

```ts
optional description?: string;
```

***

### match?

```ts
optional match?: boolean;
```

Defined in: [types.ts:323](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L323)

The node is a search match

***

### length?

```ts
optional length?: number;
```

Defined in: [types.ts:328](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L328)

Number of child entries / items.
Also determines if expandables can be expanded (needs to be not `undefined`/`null`/`zero`).

***

### showLength?

```ts
optional showLength?: boolean;
```

Defined in: [types.ts:332](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/types.ts#L332)

Should the node show it's given length / count
