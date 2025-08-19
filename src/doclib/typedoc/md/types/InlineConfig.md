---
title:
  - inline-config
  - InlineConfig
children:
  - - ok
    - Ok
---

# InlineConfig `<` T `>` 

```ts
type InlineConfig<T> = { [key in keyof typeof inlineConfigProperties]: InlineConfig<T> } & {
  Ok: Configurable<T>;
};
```

Use chainable inline configuration in a template.
Complete configuration and return component with `Ok`

Will override global options and options passed with `withOptions`

## Type declaration

### Ok

```ts
Ok: Configurable<T>;
```

Finish inline configuration and return component

## Type Parameters

### T

`T` = `Component`

## See

[inlineConfigProperties](../variables/inlineConfigProperties)

## Example

```svelte
<script>
 import Inspect from 'svelte-inspect-value'
 import data from './data.js'
</script>

<Inspect.Values.Expand0.Config.Borderless.DoubleQuotes.DarkTheme.Ok
 {data}
/>
```
