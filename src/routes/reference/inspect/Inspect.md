## Inspect

Value-inspector component. Default export of `svelte-inspect-value`.

Also used to access variations of the component: `Inspect.Values` and `Inspect.Panel`

### Example

```svelte
<script>
  import Inspect from 'svelte-inspect-value'
  import data from './data.js'
</script>

<Inspect value={data} />
<Inspect.Values {data} />
<Inspect.Panel value={data} />
```

<div class="md-types">
<h2 id="props">Props</h2>

`Inspect` accepts the following props as well as any property of [InspectOptions](/reference/inspect-options)

<h3 id="value">value</h3>

```ts
unknown
```

Any (single) value of any type to be inspected.

Will not be inspected if [`InspectProps.values`](#values) is used

If value is `undefined` or `null` without [InspectProps.name](#name) being set,
the value will not be inspected

#### Default

`undefined`

<h3 id="values">values</h3>

```ts
unknown
```

Inspect every enumerable property of a value, object or array-like.

Allows for multiple root-level nodes, unlike [`InspectProps.value`](#value).

#### Default

`undefined`

<h3 id="heading">heading</h3>

```ts
string | Snippet
```

A `string` or Snippet that will be rendered as a small heading with a collapse-button for the component.

#### Default

`undefined`

<h3 id="name">name</h3>

```ts
string
```

Name of inspected value. Will be displayed as the "key" of the value.

Will not be used if [`InspectProps.values`](#values) is set

#### See

[`InspectOptions.expandPaths`](/reference/inspect-options#expandPaths)

#### Default

`undefined`

</div>
