---
editUrl: false
next: false
prev: false
title: "Inspect"
---

```ts
const Inspect: Component<InspectProps, {
  search: (query) => void;
}, string> & {
  Values: Configurable<Component<Record<string, unknown>, {
  }, string>>;
  Panel: Component<PanelProps, object, 
     | "align"
     | "open"
     | "appearance"
     | "opacity"
     | "width"
     | "height"
    | "resize">;
};
```

Defined in: [index.ts:28](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/index.ts#L28)

Value-inspector component.

Also used to access variations of the component: Inspect.Values and Inspect.Panel

## Type Declaration

### Values

```ts
Values: Configurable<Component<Record<string, unknown>, {
}, string>>;
```

Another version of `Inspect` that will inspect any value passed to it instead of using the `value`-prop.

Configure using `setGlobalInspectOptions`, \[InspectOptionsProvider\](./InspectOptionsProvider.svelte),
`InspectValues.withOptions` or chainable inline configuration (`InspectValues.Config`)
listed in order of priority.

#### Example

```svelte
<script>
 import Inspect from 'svelte-inspect-value'

 const InspectValues = Inspect.Values.withOptions(() => ({ expandLevel: 2 }))
 const DarkInspect = InspectValues.withOptions(() => ({ theme: 'dark' }))

 let str = 'hi'
 let obj = { a: 1 }
</script>

<!-- unconfigured -->
<Inspect.Values {str} {obj} />

<!-- configured with withOptions -->
<InspectValues {str} {obj} arr={[1,2,3]} />

<!-- configured with withOptions. Will inherit expandLevel from InspectValues -->
<DarkInspect {...obj} />

<!-- chainable inline config -->
<DarkInspect.Config.Borderless.NoAnimate.Ok {str} {obj} />
```

### Panel

```ts
Panel: Component<PanelProps, object, 
  | "align"
  | "open"
  | "appearance"
  | "opacity"
  | "width"
  | "height"
| "resize">;
```

A fixed-position panel version of [`Inspect`](/api/variables/inspect/)

#### Example

```svelte
<script>
 import Inspect from 'svelte-inspect-value'
 import data from './data.js'
</script>

<Inspect.Panel
 value={data}
 name="data"
 position={['top', 'right']}
 appearance="dense"
/>
```

## See

[InspectProps](/api/type-aliases/inspectprops/)

## Example

```svelte
<script>
 import Inspect from 'svelte-inspect-value'
 import data from './data.js'
</script>

<Inspect value={data} />
<Inspect.Values {data} />
<Inspect.Panel value={data} />
```
