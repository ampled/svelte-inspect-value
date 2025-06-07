---
title:
  - inspect-options
  - InspectOptions
children:
  - - anim-rate
    - animRate
  - - borderless
    - borderless
  - - can-copy
    - canCopy
  - - custom-components
    - customComponents
  - - easing
    - easing
  - - element-view
    - elementView
  - - embed-media
    - embedMedia
  - - expand-all
    - expandAll
  - - expand-level
    - expandLevel
  - - expand-paths
    - expandPaths
  - - flash-on-update
    - flashOnUpdate
  - - heading
    - heading
  - - highlight-matches
    - highlightMatches
  - - noanimate
    - noanimate
  - - on-collapse-change
    - onCollapseChange
  - - on-copy
    - onCopy
  - - on-log
    - onLog
  - - parse-json
    - parseJson
  - - preview-depth
    - previewDepth
  - - preview-entries
    - previewEntries
  - - quotes
    - quotes
  - - render-if
    - renderIf
  - - search
    - search
  - - search-mode
    - searchMode
  - - show-length
    - showLength
  - - show-preview
    - showPreview
  - - show-tools
    - showTools
  - - show-types
    - showTypes
  - - stores
    - stores
  - - string-collapse
    - stringCollapse
  - - theme
    - theme
---

# InspectOptions

```ts
type InspectOptions = {
  animRate: number;
  borderless: boolean;
  canCopy: (value: unknown, type: string, path: unknown[]) => boolean
     | undefined;
  customComponents: CustomComponents;
  easing: (t: number) => number;
  elementView: "simple" | "full";
  embedMedia: boolean;
  expandAll: boolean;
  expandLevel: number;
  expandPaths: string[];
  flashOnUpdate: boolean;
  heading: boolean | string | Snippet<[boolean]>;
  highlightMatches: boolean;
  noanimate: boolean;
  onCollapseChange: (state: CollapseState) => void | undefined;
  onCopy: (value: unknown, type: string, path: unknown[]) => Promise<boolean | void> | boolean | void
     | undefined;
  onLog: (value: unknown, type: string, path: unknown[]) => void
     | undefined;
  parseJson: boolean;
  previewDepth: number;
  previewEntries: number;
  quotes: "single" | "double" | "none";
  renderIf: unknown;
  search: boolean | "highlight" | "filter" | "filter-strict";
  searchMode: "and" | "or";
  showLength: boolean;
  showPreview: boolean;
  showTools: boolean;
  showTypes: boolean;
  stores: boolean | "value-only" | "full";
  stringCollapse: number;
  theme: "inspect" | "drak" | "stereo" | "dark" | "light" | "plain"
     | string & { };
};
```

Various options to configure the look and feel of components exported by `'svelte-inspect-value'`

These can be set directly on `Inspect` and `Inspect.Panel` as props, or "globally" using
[setGlobalInspectOptions](../functions/setGlobalInspectOptions) or `InspectOptionsProvider`
Props will override any options using the provider methods.

## Example

```svelte
<script>
 import Inspect, {InspectOptionsProvider} from 'svelte-inspect-value'
 import data from './data.js'
</script>

<InspectOptionsProvider options={{ expandLevel: 3, theme: 'light' }}>
  <Inspect value={data} expandLevel={20} /> <!-- override expandLevel -->
</InspectOptionsProvider>
```

## Properties

### animRate

```ts
animRate: number;
```

Set transition / animation rates.

`0.5` will double transition durations while `2` will halve durations.

The base duration for transitions is 250ms.

#### Default

```ts
1
```

***

### borderless

```ts
borderless: boolean;
```

Render no borders or background

#### Default

```ts
false
```

***

### canCopy

```ts
canCopy: 
  | (value: unknown, type: string, path: unknown[]) => boolean
  | undefined;
```

Custom predicate that determines if copy-button should be displayed for a value

#### Default

```ts
undefined
```

***

### customComponents

```ts
customComponents: CustomComponents;
```

Custom components for displaying types.
An object with type as keyname and array of component and optional
prop modification function and predicate determining if custom component should be used.

Use the helper function [`addComponent`](../functions/addComponent) to get properly typed props for the custom component.

#### Example

```svelte
<script lang="ts">
 import Inspect, {addComponent} from 'svelte-inspect-value'
 import HexColorDisplay from './HexColorDisplay.svelte'
 import CustomBigIntDisplay from './CustomBigIntDisplay.svelte'
</script>

<Inspect customComponents={{
   bigint: [CustomBigIntDisplay],
   string: addComponent(
     HexColorDisplay,
     // transform props or pass extra props
     (props) => props,
     // revert to default string component if false
     (props) => props.value.startsWith('#'))
}} />
```

#### Default

```ts
{}
```

***

### easing()

```ts
easing: (t: number) => number;
```

Easing-function for expand/collapse transitions

#### Parameters

##### t

`number`

#### Returns

`number`

#### Default

```ts
(t) => Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0; // quartOut
```

***

### elementView

```ts
elementView: "simple" | "full";
```

Determines what properties are shown when inspecting HTML elements

- `'simple'` - minimal list of properties including classList, styles, dataset and current scrollPositions
- `'full'` - lists all enumerable properties of an element

#### Default

```ts
'simple'
```

***

### embedMedia

```ts
embedMedia: boolean;
```

Embed images or sounds if a string is a url or path ending with a valid image or sound file extension

#### Default

```ts
false
```

***

### expandAll

```ts
expandAll: boolean;
```

Expand all expandable nodes by default

#### Default

```ts
false
```

***

### expandLevel

```ts
expandLevel: number;
```

Default expanded level

#### Default

```ts
1
```

***

### expandPaths

```ts
expandPaths: string[];
```

Initially expanded paths

#### Default

```ts
[]
```

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

***

### flashOnUpdate

```ts
flashOnUpdate: boolean;
```

Indicate when a value or child value is updated

#### Default

```ts
true
```

***

### heading

```ts
heading: boolean | string | Snippet<[boolean]>;
```

A `string` or `Snippet` that will be rendered as a small heading with a collapse-button for the component.

The snippet parameter indicates if the instance has been collapsed

***

### highlightMatches

```ts
highlightMatches: boolean;
```

When `search` is enabled, highlight matches in keys,
types and values when typing in the search input box.

#### See

[InspectOptions.search](#search)

#### Default

```ts
true
```

***

### noanimate

```ts
noanimate: boolean;
```

Disable all animations (both css and Svelte transitions)

#### Default

```ts
false
```

***

### onCollapseChange

```ts
onCollapseChange: (state: CollapseState) => void | undefined;
```

Called whenever a node is collapsed or expanded.

#### Default

```ts
undefined
```

***

### onCopy

```ts
onCopy: 
  | (value: unknown, type: string, path: unknown[]) => Promise<boolean | void> | boolean | void
  | undefined;
```

Custom callback run when clicking copy tool-button.
If this option is set without passing a function to `canCopy`, the
copy button will be shown for all values.

This overrides the default copy-button behavior.

#### See

[InspectOptions.canCopy](#cancopy)

#### Returns

`boolean` or `Promise` resolving to boolean indicating copying value was successful if true. The copy button will change color on success.

#### Default

```ts
undefined
```

***

### onLog

```ts
onLog: 
  | (value: unknown, type: string, path: unknown[]) => void
  | undefined;
```

Custom callback run when clicking log tool-button.

This overrides the default log-button behavior.

#### Default

```ts
undefined
```

***

### parseJson

```ts
parseJson: boolean;
```

Try parsing strings that start with `'['` or `'{'` and display the parsed value

#### Default

```ts
false
```

***

### previewDepth

```ts
previewDepth: number;
```

How many levels of nested values to preview before "collapsing" nested values to their type only

#### Default

```ts
1
```

***

### previewEntries

```ts
previewEntries: number;
```

How many entries / items of arrays, objects, maps, sets etc. to preview

#### Default

```ts
3
```

***

### quotes

```ts
quotes: "single" | "double" | "none";
```

Display string values with double or single quotes

#### Default

```ts
'single'
```

***

### renderIf

```ts
renderIf: unknown;
```

Render condition for `Inspect`

Function or value. `Inspect` will render if value or return-value is truthy.

Most valuable if set with global options and there are multiple `Inspect` instances,
otherwise using Svelte `{#if}{/if}` blocks is recommended.

#### Default

```ts
true
```

***

### search

```ts
search: boolean | "highlight" | "filter" | "filter-strict";
```

Enable or disable search functionality.

Three modes are available:

- `'filter' | true` - children and siblings of matching nodes will be visible
- `'filter-strict'` - only matches will be visible
- `'highlight'` - no nodes will be hidden, but matches will be highlighted

#### Default

```ts
false
```

***

### searchMode

```ts
searchMode: "and" | "or";
```

Initial multi-term search mode

- `'and'` - nodes must match every term
- `'or'` - nodes can match one of the terms

#### Default

```ts
'or'
```

***

### showLength

```ts
showLength: boolean;
```

Display length of arrays or strings and number of nested entries in objects / maps etc

#### Default

```ts
true
```

***

### showPreview

```ts
showPreview: boolean;
```

Display preview of nested values

#### Default

```ts
true
```

***

### showTools

```ts
showTools: boolean;
```

Enable or disable "tool-buttons" that appear on hovering a value.

#### Default

```ts
true
```

***

### showTypes

```ts
showTypes: boolean;
```

Display type labels before values e.g. "string" / "number"
Does not affect class / function / promise

#### Default

```ts
true
```

***

### stores

```ts
stores: boolean | "value-only" | "full";
```

Enable or disable svelte-store inspection.
Objects with a `subscribe` method will be inspected as stores and show their subscription value.

Set to `true`, `'value-only'` or `'full'` to enable.

- `'full' | true` - render store value as nested value along with other properties on the store object
- `'value-only'` - render store value only along with a note indicating the value was retrieved from a store

#### Default

```ts
'full'
```

***

### stringCollapse

```ts
stringCollapse: number;
```

Set a max display length for string values. `0` means display full string

#### Default

```ts
0
```

***

### theme

```ts
theme: 
  | "inspect" | "drak" | "stereo" | "dark" | "light" | "plain"
  | string & {
};
```

Set color theme class

Available themes: `'inspect'|'drak'|'stereo'|'dark'|'light'|'plain'

#### Default

```ts
'inspect'
```
