---
editUrl: false
next: false
prev: false
title: 'configured'
---

```ts
function configured(options): Configurable<LegacyComponentType>
```

Creates a pre-configured Inspect-component that will inspect any value passed to it
instead of using the `value`-prop.

The component will also inherit options set with `setGlobalInspectOptions` or `InspectOptionsProvider`.

"Global" options will be overriden by options passed to this method.

## Parameters

### options

[`InspectValuesOptions`](/api/type-aliases/inspectvaluesoptions/)

## Returns

[`Configurable`](/api/type-aliases/configurable/)\<`LegacyComponentType`\>

## Example

```svelte
<script>
  import { configured } from 'svelte-inspect-value'

  const Inspect = configured(() => ({ theme: 'plain', borderless: true, showPreview: false }))

  let str = 'hi'
  let obj = {}
</script>

<Inspect {str} {obj} arr={[1, 2, 3]} />
```

## See

- [`options.setGlobalInspectOptions`](/api/functions/setglobalinspectoptions/)
- Configurable.withOptions
