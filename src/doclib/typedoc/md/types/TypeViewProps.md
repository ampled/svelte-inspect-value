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
  key: KeyType;
  keyDelim: string;
  keyPrefix: string;
  keyStyle: HTMLAttributes<HTMLDivElement>["style"];
  note: {
     description: string;
     title: string;
  };
  path: KeyType[];
  showKey: boolean;
  type: Type;
  value: Value;
};
```

## Type Parameters

### Value

`Value` = `unknown`

### Type

`Type` = `ValueType`

## Properties

### display?

```ts
optional display: string;
```

Representation of value.

Use to customize how a value is represented while still being able to pass the original
value for other purposes

***

### forceType?

```ts
optional forceType: boolean;
```

Force type indicator visibility for this node

***

### key?

```ts
optional key: KeyType;
```

***

### keyDelim?

```ts
optional keyDelim: string;
```

***

### keyPrefix?

```ts
optional keyPrefix: string;
```

***

### keyStyle?

```ts
optional keyStyle: HTMLAttributes<HTMLDivElement>["style"];
```

***

### note?

```ts
optional note: {
  description: string;
  title: string;
};
```

#### description?

```ts
optional description: string;
```

#### title?

```ts
optional title: string;
```

***

### path?

```ts
optional path: KeyType[];
```

Path of the node

***

### showKey?

```ts
optional showKey: boolean;
```

***

### type?

```ts
optional type: Type;
```

Type of the value

***

### value

```ts
value: Value;
```
