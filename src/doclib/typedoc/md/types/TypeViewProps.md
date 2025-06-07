---
title:
  - type-view-props
  - TypeViewProps
children:
  - - display
    - display
  - - force-type
    - forceType
  - - key
    - key
  - - key-delim
    - keyDelim
  - - key-prefix
    - keyPrefix
  - - key-style
    - keyStyle
  - - length
    - length
  - - match
    - match
  - - note
    - note
  - - path
    - path
  - - show-key
    - showKey
  - - show-length
    - showLength
  - - type
    - type
  - - value
    - value
---

# TypeViewProps `<` Value, Type `>` 

```ts
type TypeViewProps<Value, Type> = {
  display: string;
  forceType: boolean;
  key: PropertyKey;
  keyDelim: string;
  keyPrefix: string;
  keyStyle: HTMLAttributes<HTMLDivElement>["style"];
  length: number;
  match: boolean;
  note: {
     description: string;
     title: string;
  };
  path: PropertyKey[];
  showKey: boolean;
  showLength: boolean;
  type: Type;
  value: Value;
};
```

## Type Parameters

### Value

`Value` = `unknown`

### Type

`Type` = [`ValueType`](ValueType)

## Properties

### display?

```ts
display: string;
```

Representation of value.

Use to customize how a value is represented while still being able to pass the original
value for other purposes

***

### forceType?

```ts
forceType: boolean;
```

Force type indicator visibility for this node

***

### key?

```ts
key: PropertyKey;
```

***

### keyDelim?

```ts
keyDelim: string;
```

Key delimiter

***

### keyPrefix?

```ts
keyPrefix: string;
```

Prefix for key e.g. "get" or "static"

***

### keyStyle?

```ts
keyStyle: HTMLAttributes<HTMLDivElement>["style"];
```

Style overrides for key

***

### length?

```ts
length: number;
```

Number of child entries / items.
Also determines if expandables can be expanded (needs to be not `undefined`/`null`/`zero`).

***

### match?

```ts
match: boolean;
```

The node is a search match

***

### note?

```ts
note: {
  description: string;
  title: string;
};
```

Title / description for node note, e.g. "parsed" for parsed JSON strings

#### description?

```ts
description: string;
```

#### title?

```ts
title: string;
```

***

### path?

```ts
path: PropertyKey[];
```

Path of the node

***

### showKey?

```ts
showKey: boolean;
```

Should key be shown

***

### showLength?

```ts
showLength: boolean;
```

Should the node show it's given length / count

***

### type?

```ts
type: Type;
```

Type of the value

***

### value

```ts
value: Value;
```
