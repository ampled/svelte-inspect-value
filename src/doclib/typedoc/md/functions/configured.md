---
title:
  - configured
  - configured
---

# configured()

```ts
function configured(options: ConfigurableOptions): Configurable<Component>;
```

Creates a pre-configured Inspect-component that will inspect any value passed to it
instead of using the `value`-prop.

The component will also inherit options set with `setGlobalInspectOptions` or `InspectOptionsProvider`.

"Global" options will be overriden by options passed to this method.

## Parameters

### options

`ConfigurableOptions`

## Returns

[`Configurable`](../types/Configurable) `<` `Component` `>` 

## Example

```svelte
<script>
 import {configured} from 'svelte-inspect-value'

 const Inspect = configured(() => ({ theme: 'plain', borderless: true, showPreview: false }))

 let str = 'hi'
 let obj = {}
</script>

<Inspect {str} {obj} arr={[1,2,3]} />
```

## See

 - [`setGlobalInspectOptions`](setGlobalInspectOptions)
 - [`Configurable.withOptions`](../types/Configurable)
