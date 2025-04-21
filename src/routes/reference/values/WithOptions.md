<h3 id="with-options">withOptions()</h3>

```ts
withOptions: (options: ConfigurableOptions) => Configurable<T>
```

Configure `Inspect.Values` or other variants created with `withOptions` or `configured`

The component will also inherit options set with `setGlobalInspectOptions` or `InspectOptionsProvider`.

"Global" options will be overriden by options passed to this method.

#### Example

```svelte
<script>
  import Inspect from 'svelte-inspect-value'

  const InspectValues = Inspect.withOptions(() => ({ theme: 'plain', showPreview: false }))
  const Ins = InspectValues.withOptions(() => ({ showTypes: false })) // inherits from InspectValues

  let str = 'hi'
  let obj = {}
</script>

<InspectValues {str} {obj} arr={[1, 2, 3]} />
```
