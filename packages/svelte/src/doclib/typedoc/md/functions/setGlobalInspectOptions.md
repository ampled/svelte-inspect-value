---
title:
  - set-global-inspect-options
  - setGlobalInspectOptions
---

# setGlobalInspectOptions()

## Call Signature

```ts
function setGlobalInspectOptions(options: () => Partial<InspectOptions>): Partial<InspectOptions>;
```

Set a context with configuration options for `Inspect`

Alternative to using the `InspectOptionsProvider`-component.

### Parameters

#### options

() => `Partial` `<` [`InspectOptions`](../types/InspectOptions) `>` 

### Returns

`Partial` `<` [`InspectOptions`](../types/InspectOptions) `>` 

## Call Signature

```ts
function setGlobalInspectOptions(options: Partial<InspectOptions>): Partial<InspectOptions>;
```

Set a context with configuration options for `Inspect`

### Parameters

#### options

`Partial` `<` [`InspectOptions`](../types/InspectOptions) `>` 

### Returns

`Partial` `<` [`InspectOptions`](../types/InspectOptions) `>` 

### Deprecated

pass a function that returns the options instead of an object
