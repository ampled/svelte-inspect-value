---
editUrl: false
next: false
prev: false
title: "setGlobalInspectOptions"
---

## Call Signature

```ts
function setGlobalInspectOptions(options): Partial<InspectOptions>;
```

Defined in: [options.svelte.ts:480](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/options.svelte.ts#L480)

Set a context with configuration options for `Inspect`

Alternative to using the `InspectOptionsProvider`-component.

### Parameters

#### options

() => `Partial`\<[`InspectOptions`](/api/type-aliases/inspectoptions/)\>

### Returns

`Partial`\<[`InspectOptions`](/api/type-aliases/inspectoptions/)\>

## Call Signature

```ts
function setGlobalInspectOptions(options): Partial<InspectOptions>;
```

Defined in: [options.svelte.ts:487](https://github.com/ampled/svelte-inspect-value/blob/a664368256ae28327133822f006affa7fd114308/packages/svelte/src/lib/options.svelte.ts#L487)

Set a context with configuration options for `Inspect`

:::caution[Deprecated]
pass a function that returns the options instead of an object
:::

### Parameters

#### options

`Partial`\<[`InspectOptions`](/api/type-aliases/inspectoptions/)\>

### Returns

`Partial`\<[`InspectOptions`](/api/type-aliases/inspectoptions/)\>
