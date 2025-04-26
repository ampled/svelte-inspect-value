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
  - - note
    - note
  - - path
    - path
  - - show-key
    - showKey
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
  note: {
     description: string;
     title: string;
  };
  path: PropertyKey[];
  showKey: boolean;
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

***

### keyPrefix?

```ts
keyPrefix: string;
```

***

### keyStyle?

```ts
keyStyle: HTMLAttributes<HTMLDivElement>["style"];
```

***

### note?

```ts
note: {
  description: string;
  title: string;
};
```

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
