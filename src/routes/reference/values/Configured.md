<h2 id="configured">configured()</h2>

```ts
function configured(options: ConfigurableOptions): Configurable<typeof Inspect.Values>
```

Creates a pre-configured Inspect-component that will inspect any value passed to it
instead of using the `value`-prop.

The component will also inherit options set with [`setGlobalInspectOptions`](/reference/options#set-global) or `InspectOptionsProvider`.

"Global" options will be overriden by options passed to this method.

### Example

```svelte
<script>
  import { configured } from 'svelte-inspect-value'

  const Inspect = configured(() => ({ theme: 'plain', borderless: true, showPreview: false }))

  let str = 'hi'
  let obj = {}
</script>

<Inspect {str} {obj} arr={[1, 2, 3]} />
```

### Parameters

#### options

```ts
type ConfigurableOptions = () => Partial<InspectValuesOptions>
```

```ts
type InspectValuesOptions = InspectOptions & {
  elementAttributes: SvelteHTMLElements['div']
}
```

#### elementAttributes

```ts
optional elementAttributes: SvelteHTMLElements["div"];
```

HTML-attributes (like `class` and `style`) that will be applied to the `Inspect.Values`-element.

Will be overwritten, not merged if a child-variation defined with `withOptions` defines this object.

## Returns

`Configurable<typeof Inspect.Values>`

## See

[setGlobalInspectOptions](/reference/options#set-global)
