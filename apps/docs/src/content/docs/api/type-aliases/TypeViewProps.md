---
editUrl: false
next: false
prev: false
title: 'TypeViewProps'
---

```ts
type TypeViewProps<Value, Type> = {
  display?: string
  forceType?: boolean
  key?: PropertyKey
  keyDelim?: string
  keyPrefix?: string
  keyStyle?: HTMLAttributes<HTMLDivElement>['style']
  length?: number
  match?: boolean
  note?: {
    description?: string
    title?: string
  }
  path?: PropertyKey[]
  showKey?: boolean
  showLength?: boolean
  type?: Type
  value: Value
}
```

## Type Parameters

### Value

`Value` = `unknown`

### Type

`Type` = [`ValueType`](/api/type-aliases/valuetype/)

## Properties

### display?

```ts
optional display?: string;
```

Representation of value.

Use to customize how a value is represented while still being able to pass the original
value for other purposes

---

### forceType?

```ts
optional forceType?: boolean;
```

Force type indicator visibility for this node

---

### key?

```ts
optional key?: PropertyKey;
```

---

### keyDelim?

```ts
optional keyDelim?: string;
```

Key delimiter

---

### keyPrefix?

```ts
optional keyPrefix?: string;
```

Prefix for key e.g. "get" or "static"

---

### keyStyle?

```ts
optional keyStyle?: HTMLAttributes<HTMLDivElement>["style"];
```

Style overrides for key

---

### length?

```ts
optional length?: number;
```

Number of child entries / items.
Also determines if expandables can be expanded (needs to be not `undefined`/`null`/`zero`).

---

### match?

```ts
optional match?: boolean;
```

The node is a search match

---

### note?

```ts
optional note?: {
  description?: string;
  title?: string;
};
```

Title / description for node note, e.g. "parsed" for parsed JSON strings

#### description?

```ts
optional description?: string;
```

#### title?

```ts
optional title?: string;
```

---

### path?

```ts
optional path?: PropertyKey[];
```

Path of the node

---

### showKey?

```ts
optional showKey?: boolean;
```

Should key be shown

---

### showLength?

```ts
optional showLength?: boolean;
```

Should the node show it's given length / count

---

### type?

```ts
optional type?: Type;
```

Type of the value

---

### value

```ts
value: Value
```
