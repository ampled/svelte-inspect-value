---
title:
  - configurable
  - Configurable
children:
  - - config
    - Config
  - - expand-0
    - Expand0
  - - expand-1
    - Expand1
  - - expand-10
    - Expand10
  - - expand-2
    - Expand2
  - - expand-3
    - Expand3
  - - expand-4
    - Expand4
  - - expand-5
    - Expand5
  - - expand-6
    - Expand6
  - - expand-7
    - Expand7
  - - expand-8
    - Expand8
  - - expand-9
    - Expand9
  - - expand-all
    - ExpandAll
  - - with-options
    - withOptions
---

# Configurable `<` TComponent `>` 

```ts
type Configurable<TComponent> = TComponent & {
  Config: InlineConfig<TComponent>;
  Expand0: Configurable<TComponent>;
  Expand1: Configurable<TComponent>;
  Expand10: Configurable<TComponent>;
  Expand2: Configurable<TComponent>;
  Expand3: Configurable<TComponent>;
  Expand4: Configurable<TComponent>;
  Expand5: Configurable<TComponent>;
  Expand6: Configurable<TComponent>;
  Expand7: Configurable<TComponent>;
  Expand8: Configurable<TComponent>;
  Expand9: Configurable<TComponent>;
  ExpandAll: Configurable<TComponent>;
  withOptions: (options: InspectValuesOptions) => Configurable<TComponent>;
};
```

Utility-type used to enhance `Inspect.Values` with `Configurable.withOptions` and chainable inline configuration.

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

### Expand0

```ts
Expand0: Configurable<TComponent>;
```

Set initial expand depth to 0

### Expand1

```ts
Expand1: Configurable<TComponent>;
```

Set initial expand depth to 1

### Expand10

```ts
Expand10: Configurable<TComponent>;
```

Set initial expand depth to 10

### Expand2

```ts
Expand2: Configurable<TComponent>;
```

Set initial expand depth to 2

### Expand3

```ts
Expand3: Configurable<TComponent>;
```

Set initial expand depth to 3

### Expand4

```ts
Expand4: Configurable<TComponent>;
```

Set initial expand depth to 4

### Expand5

```ts
Expand5: Configurable<TComponent>;
```

Set initial expand depth to 5

### Expand6

```ts
Expand6: Configurable<TComponent>;
```

Set initial expand depth to 6

### Expand7

```ts
Expand7: Configurable<TComponent>;
```

Set initial expand depth to 7

### Expand8

```ts
Expand8: Configurable<TComponent>;
```

Set initial expand depth to 8

### Expand9

```ts
Expand9: Configurable<TComponent>;
```

Set initial expand depth to 9

### ExpandAll

```ts
ExpandAll: Configurable<TComponent>;
```

Initially expand all nodes (max 30)

### withOptions()

```ts
withOptions: (options: InspectValuesOptions) => Configurable<TComponent>;
```

Configure `Inspect.Values` or other variants created with `withOptions` or [`configured`](../functions/configured)

The component will also inherit options set with `setGlobalInspectOptions` or `InspectOptionsProvider`.

"Global" options will be overriden by options passed to this method.

#### Parameters

##### options

[`InspectValuesOptions`](InspectValuesOptions)

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

## Type Parameters

### TComponent

`TComponent` = `Component`
