---
editUrl: false
next: false
prev: false
title: "InlineConfig"
---

```ts
type InlineConfig<T> = { [key in keyof typeof inlineConfigProperties]: InlineConfig<T> } & {
  Ok: Configurable<T>;
};
```

Defined in: [configurable.ts:100](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/configurable.ts#L100)

Use chainable inline configuration in a template.
Complete configuration and return component with `Ok`

Will override global options and options passed with `withOptions`

## Type Declaration

### Ok

```ts
Ok: Configurable<T>;
```

Finish inline configuration and return component

## Type Parameters

### T

`T` = `Component`

## See

inlineConfigProperties

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
