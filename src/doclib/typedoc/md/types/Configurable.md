---
title:
  - configurable
  - Configurable
---

# Configurable `<` TComponent `>` 

```ts
type Configurable<TComponent> = TComponent & {
  ExpandAll: Configurable<TComponent>;
  withOptions: (options: ConfigurableOptions) => Configurable<TComponent>;
} & { [key in ExpandKey]: Configurable<TComponent> } & {
  Config: InlineConfig<TComponent>;
};
```

## Type declaration

### ExpandAll

```ts
ExpandAll: Configurable<TComponent>;
```

Initially expand all nodes (max 30)

### withOptions()

```ts
withOptions: (options: ConfigurableOptions) => Configurable<TComponent>;
```

Configure `Inspect.Values` or other variants created with `withOptions` or `configured`

The component will also inherit options set with `setGlobalInspectOptions` or `InspectOptionsProvider`.

"Global" options will be overriden by options passed to this method.

#### Parameters

##### options

`ConfigurableOptions`

#### Returns

`Configurable` `<` `TComponent` `>` 

#### Example

```svelte
<script>
 import Inspect from 'svelte-inspect-value'

 const InspectValues = Inspect.withOptions(() => ({ theme: 'plain', showPreview: false }))
 const Ins = InspectValues.withOptions(() => ({ showTypes: false })) // inherits from InspectValues

 let str = 'hi'
 let obj = {}
</script>

<InspectValues {str} {obj} arr={[1,2,3]} />
```

## Type declaration

### Config

```ts
Config: InlineConfig<TComponent>;
```

Use chainable inline configuration in a template.
Complete configuration and return component with `Ok`

Will override global options and options passed with `withOptions`

#### Example

```svelte
<script>
 import Inspect from 'svelte-inspect-value'
 import data from './data.js'
</script>

<Inspect.Values.Expand0.Config.Borderless.DoubleQuotes.DarkTheme.Ok
 {data}
/>
```

## Type Parameters

### TComponent

`TComponent` = `Component`
