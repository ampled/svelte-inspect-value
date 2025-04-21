<script>
  import MinimalExample from '$doclib/examples/MinimalExample.svelte'
</script>

<h2 id="inspect-options">InspectOptions</h2>

```ts
type InspectOptions = {
  borderless: boolean
  canCopy: ((value: unknown, type: string, path: unknown[]) => boolean) | undefined
  customComponents: CustomComponents
  elementView: 'simple' | 'full'
  embedMedia: boolean
  expandAll: boolean
  expandLevel: number
  expandPaths: string[]
  flashOnUpdate: boolean
  noanimate: boolean
  onCollapseChange: ((state: InspectState) => void) | undefined
  onLog: ((value: unknown, type: string, path: unknown[]) => void) | undefined
  parseJson: boolean
  previewDepth: number
  previewEntries: number
  quotes: 'single' | 'double' | 'none'
  renderIf: unknown
  showLength: boolean
  showPreview: boolean
  showTools: boolean
  showTypes: boolean
  stores: boolean | 'value-only' | 'full'
  stringCollapse: number
  theme: 'inspect' | 'drak' | 'stereo' | 'dark' | 'light' | 'plain' | (string & {})
  onCopy:
    | ((value: unknown, type: string, path: unknown[]) => Promise<boolean | void> | boolean | void)
    | undefined
}
```

Various options to configure the look and feel of components exported by `'svelte-inspect-value'`

These can be set directly on `Inspect` and `Inspect.Panel` as props, or "globally" using
[setGlobalInspectOptions](#set-global) or `InspectOptionsProvider`.

Props will override any options using the provider methods.

## Example

```svelte
<script>
  import Inspect, { InspectOptionsProvider } from 'svelte-inspect-value'
  import data from './data.js'
</script>

<InspectOptionsProvider options={{ expandLevel: 3, theme: 'light' }}>
  <!-- override expandLevel -->
  <Inspect value={data} expandLevel={20} />
</InspectOptionsProvider>
```

## Properties

<h3 id="borderless">borderless</h3>

```ts
borderless: boolean
```

Use no borders and transparent background

#### Default

`false`

#### Demo

<MinimalExample borderless />

<h3 id="canCopy">canCopy</h3>

```ts
canCopy: ((value: unknown, type: string, path: unknown[]) => boolean) | undefined
```

Custom predicate that determines if copy-button should be displayed for a value

#### Default

`undefined`

<h3 id="customComponents">customComponents</h3>

```ts
customComponents: CustomComponents
```

Custom components for displaying types.
An object with type as keyname and array of component and optional
prop modification function and predicate determining if custom component should be used.

Use the helper function `addComponent` to get properly typed props for the custom component.

#### Example

```svelte
<script lang="ts">
  import Inspect, { addComponent } from 'svelte-inspect-value'
  import HexColorDisplay from './HexColorDisplay.svelte'
  import CustomBigIntDisplay from './CustomBigIntDisplay.svelte'
</script>

<Inspect
  customComponents={{
    bigint: [CustomBigIntDisplay],
    string: addComponent(
      HexColorDisplay,
      // transform props or pass extra props
      (props) => props,
      // revert to default string component if false
      (props) => props.value.startsWith('#')
    ),
  }}
/>
```

#### Default

`{}`

<h3 id="elementView">elementView</h3>

```ts
elementView: 'simple' | 'full'
```

Determines what properties are shown when inspecting HTML elements

`'simple'` - minimal list of properties including classList, styles, dataset and current scrollPositions

`'full'` - lists all enumerable properties of an element

#### Default

`'simple'`

<h3 id="embedMedia">embedMedia</h3>

```ts
embedMedia: boolean
```

Embed images or sounds if a string is a url or path ending with a valid image or sound file extension

#### Default

`false`

<h3 id="expandAll">expandAll</h3>

```ts
expandAll: boolean
```

Expand all expandable nodes by default

#### Default

`false`

<h3 id="expandLevel">expandLevel</h3>

```ts
expandLevel: number
```

Default expanded level

#### Default

`1`

<h3 id="expandPaths">expandPaths</h3>

```ts
expandPaths: string[];
```

Initially expanded paths

#### Default

`[]`

#### Example

```svelte
<script>
 import Inspect from 'svelte-inspect-value'

 const value = {
  a: { b: [{ c: '' }], d: 0 }
 }
</script>

<!-- default name of root expandable is "root" -->
<Inspect {value} expandPaths={['root.a.b.0']} />
<!-- if name is set -->
<Inspect {value} name="obj" expandPaths={['obj.a.b.0']}
```

<h3 id="flashOnUpdate">flashOnUpdate</h3>

```ts
flashOnUpdate: boolean
```

Indicate when a value or child value is updated

#### Default

`true`

<h3 id="noanimate">noanimate</h3>

```ts
noanimate: boolean
```

Disable animations

#### Default

`false`

<h3 id="onCollapseChange">onCollapseChange</h3>

```ts
onCollapseChange: (state: InspectState) => void | undefined
```

Called whenever a node is collapsed or expanded.

#### Default

`undefined`

<h3 id="onCopy">onCopy</h3>

```ts
onCopy:
  | ((value: unknown, type: string, path: unknown[]) => boolean | void | Promise<boolean | void>)
  | undefined
```

Custom callback run when clicking copy tool-button.
If this option is set without passing a function to `canCopy`, the
copy button will be shown for all values.

This overrides the default copy-button behavior.

#### See

[InspectOptions.canCopy](#canCopy)

#### Returns

`boolean` or `Promise` resolving to boolean indicating copying value was successful if true. The copy button will change color on success.

#### Default

`undefined`

<h3 id="onLog">onLog</h3>

```ts
onLog: (value, type, path) => void | undefined;
```

Custom callback run when clicking log tool-button.

This overrides the default log-button behavior.

#### Default

`undefined`

<h3 id="parseJson">parseJson</h3>

```ts
parseJson: boolean
```

Try parsing strings that start with `'['` or `'{'` and display the parsed value

#### Default

```ts
false
```

<h3 id="previewDepth">previewDepth</h3>

```ts
previewDepth: number
```

How many levels of nested values to preview before "collapsing" nested values to their type only

#### Default

`1`

<h3 id="previewEntries">previewEntries</h3>

```ts
previewEntries: number
```

How many entries / items of arrays, objects, maps, sets etc. to preview

#### Default

`3`

<h3 id="quotes">quotes</h3>

```ts
quotes: 'single' | 'double' | 'none'
```

Display string values with double or single quotes

#### Default

`'single'`

<h3 id="renderIf">renderIf</h3>

```ts
renderIf: unknown
```

Render condition for `Inspect`

Function or value. `Inspect` will render if value or return-value is truthy.

Most valuable if set with global options and there are multiple `Inspect` instances,
otherwise using Svelte `{#if}{/if}` blocks is recommended.

#### Default

`true`

<h3 id="showLength">showLength</h3>

```ts
showLength: boolean
```

Display length of arrays or strings and number of nested entries in objects / maps etc

#### Default

`true`

<h3 id="showPreview">showPreview</h3>

```ts
showPreview: boolean
```

Display preview of nested values

#### Default

`true`

<h3 id="showTools">showTools</h3>

```ts
showTools: boolean
```

Enable or disable "tool-buttons" that appear on hovering a value.

#### Default

`true`

<h3 id="showTypes">showTypes</h3>

```ts
showTypes: boolean
```

Display type labels before values e.g. "string" / "number"
Does not affect class / function / promise

#### Default

`true`

<h3 id="stores">stores</h3>

```ts
stores: boolean | 'value-only' | 'full'
```

Enable or disable svelte-store inspection.
Objects with a `subscribe` method will be inspected as stores and show their subscription value.

Set to `true`, `'value-only'` or `'full'` to enable.

`'full' | true` - render store value as nested value along with other properties on the store object

`'value-only'` - render store value only along with a note indicating the value was retrieved from a store

#### Default

`'full'`

<h3 id="stringCollapse">stringCollapse</h3>

```ts
stringCollapse: number
```

Set a max display length for string values. `0` means display full string

#### Default

`0`

<h3 id="theme">theme</h3>

```ts
theme:
  | "inspect" | "drak" | "stereo" | "dark" | "light" | "plain"
  | string & {
};
```

Set color theme class

Available themes: `'inspect'|'drak'|'stereo'|'dark'|'light'|'plain'|'cotton-candy'`

#### Default

`'inspect'`

<h2 id="set-global">setGlobalInspectOptions()</h2>

```ts
function setGlobalInspectOptions(options: () => Partial<InspectOptions>): Partial<InspectOptions>
```

Set a context with configuration options for `Inspect`

### Parameters

#### options

```ts
;() => Partial<InspectOptions>
```

### Returns

```ts
Partial<InspectOptions>>
```
