---
editUrl: false
next: false
prev: false
title: "InspectOptions"
---

```ts
type InspectOptions = {
  showLength: boolean;
  showTypes: boolean;
  showPreview: boolean;
  previewEntries: number;
  previewDepth: number;
  flashOnUpdate: boolean;
  showTools: boolean;
  stringCollapse: number;
  customComponents: CustomComponents;
  noanimate: boolean;
  animRate: number;
  easing: (t) => number;
  borderless: boolean;
  quotes: "single" | "double" | "none";
  theme:   | "inspect" | "drak" | "stereo" | "dark" | "light" | "plain"
     | string & {
   };
  expandAll: boolean;
  expandLevel: number;
  expandPaths: string[];
  embedMedia: boolean;
  elementView: "simple" | "full";
  renderIf: unknown;
  parseJson: boolean;
  onCopy:   | (value, type, path) => Promise<boolean | void> | boolean | void
     | undefined;
  canCopy: (value, type, path) => boolean | undefined;
  onLog: (value, type, path) => void | undefined;
  onCollapseChange: (state) => void | undefined;
  stores: boolean | "value-only" | "full";
  search: boolean | "highlight" | "filter" | "filter-strict";
  searchMode: "and" | "or";
  highlightMatches: boolean;
  heading: boolean | string | Snippet<[boolean]>;
  hotkeys:   | Partial<InspectHotkeys>
     | boolean;
  disableKeynav: boolean;
  typeToFocus: boolean;
};
```

Defined in: [options.svelte.ts:79](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L79)

Various options to configure the look and feel of components exported by `'svelte-inspect-value'`

These can be set directly on `Inspect` and `Inspect.Panel` as props, or "globally" using
[setGlobalInspectOptions](/api/functions/setglobalinspectoptions/) or `InspectOptionsProvider`
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

### showLength

```ts
showLength: boolean;
```

Defined in: [options.svelte.ts:85](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L85)

Display length of arrays or strings and number of nested entries in objects / maps etc

#### Default

```ts
true
```

***

### showTypes

```ts
showTypes: boolean;
```

Defined in: [options.svelte.ts:92](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L92)

Display type labels before values e.g. "string" / "number"
Does not affect class / function / promise

#### Default

```ts
true
```

***

### showPreview

```ts
showPreview: boolean;
```

Defined in: [options.svelte.ts:98](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L98)

Display preview of nested values

#### Default

```ts
true
```

***

### previewEntries

```ts
previewEntries: number;
```

Defined in: [options.svelte.ts:104](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L104)

How many entries / items of arrays, objects, maps, sets etc. to preview

#### Default

```ts
3
```

***

### previewDepth

```ts
previewDepth: number;
```

Defined in: [options.svelte.ts:110](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L110)

How many levels of nested values to preview before "collapsing" nested values to their type only

#### Default

```ts
1
```

***

### flashOnUpdate

```ts
flashOnUpdate: boolean;
```

Defined in: [options.svelte.ts:116](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L116)

Indicate when a value or child value is updated

#### Default

```ts
true
```

***

### showTools

```ts
showTools: boolean;
```

Defined in: [options.svelte.ts:122](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L122)

Enable or disable "tool-buttons" that appear on hovering a value.

#### Default

```ts
true
```

***

### stringCollapse

```ts
stringCollapse: number;
```

Defined in: [options.svelte.ts:128](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L128)

Set a max display length for string values. `0` means display full string

#### Default

```ts
0
```

***

### customComponents

```ts
customComponents: CustomComponents;
```

Defined in: [options.svelte.ts:157](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L157)

Custom components for displaying types.
An object with type as keyname and array of component and optional
prop modification function and predicate determining if custom component should be used.

Use the helper function [`addComponent`](/api/functions/addcomponent/) to get properly typed props for the custom component.

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

### noanimate

```ts
noanimate: boolean;
```

Defined in: [options.svelte.ts:163](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L163)

Disable all animations (both css and Svelte transitions)

#### Default

```ts
false
```

***

### animRate

```ts
animRate: number;
```

Defined in: [options.svelte.ts:173](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L173)

Set transition / animation rates

`0.5` will double transition durations while `2` will halve durations.

The base duration for transitions is 250ms.

#### Default

```ts
1
```

***

### easing()

```ts
easing: (t) => number;
```

Defined in: [options.svelte.ts:179](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L179)

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

### borderless

```ts
borderless: boolean;
```

Defined in: [options.svelte.ts:185](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L185)

Render no borders or background

#### Default

```ts
false
```

***

### quotes

```ts
quotes: "single" | "double" | "none";
```

Defined in: [options.svelte.ts:191](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L191)

Display string values with double or single quotes

#### Default

```ts
'single'
```

***

### theme

```ts
theme: 
  | "inspect" | "drak" | "stereo" | "dark" | "light" | "plain"
  | string & {
};
```

Defined in: [options.svelte.ts:199](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L199)

Set color theme class

Available themes: `'inspect'|'drak'|'stereo'|'dark'|'light'|'plain'

#### Default

```ts
'inspect'
```

***

### expandAll

```ts
expandAll: boolean;
```

Defined in: [options.svelte.ts:205](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L205)

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

Defined in: [options.svelte.ts:211](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L211)

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

Defined in: [options.svelte.ts:232](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L232)

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

### embedMedia

```ts
embedMedia: boolean;
```

Defined in: [options.svelte.ts:238](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L238)

Embed images or sounds if a string is a url or path ending with a valid image or sound file extension

#### Default

```ts
false
```

***

### elementView

```ts
elementView: "simple" | "full";
```

Defined in: [options.svelte.ts:247](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L247)

Determines what properties are shown when inspecting HTML elements

- `'simple'` - minimal list of properties including classList, styles, dataset and current scrollPositions
- `'full'` - lists all enumerable properties of an element

#### Default

```ts
'simple'
```

***

### renderIf

```ts
renderIf: unknown;
```

Defined in: [options.svelte.ts:258](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L258)

Render condition for `Inspect`

Function or value. `Inspect` will render if value or return-value is truthy.

Most valuable if set with global options and there are multiple `Inspect` instances,
otherwise using Svelte `{#if}{/if}` blocks is recommended.

#### Default

```ts
true
```

***

### parseJson

```ts
parseJson: boolean;
```

Defined in: [options.svelte.ts:264](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L264)

Try parsing strings that start with `'['` or `'{'` and display the parsed value

#### Default

```ts
false
```

***

### onCopy

```ts
onCopy: 
  | (value, type, path) => Promise<boolean | void> | boolean | void
  | undefined;
```

Defined in: [options.svelte.ts:276](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L276)

Custom callback run when clicking copy tool-button.
If this option is set without passing a function to `canCopy`, the
copy button will be shown for all values.

This overrides the default copy-button behavior.

#### See

[InspectOptions.canCopy](/api/type-aliases/inspectoptions/#cancopy)

#### Returns

`boolean` or `Promise` resolving to boolean indicating copying value was successful if true. The copy button will change color on success.

#### Default

```ts
undefined
```

***

### canCopy

```ts
canCopy: (value, type, path) => boolean | undefined;
```

Defined in: [options.svelte.ts:288](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L288)

Custom predicate that determines if copy-button should be displayed for a value

#### Default

```ts
undefined
```

***

### onLog

```ts
onLog: (value, type, path) => void | undefined;
```

Defined in: [options.svelte.ts:296](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L296)

Custom callback run when clicking log tool-button.

This overrides the default log-button behavior.

#### Default

```ts
undefined
```

***

### onCollapseChange

```ts
onCollapseChange: (state) => void | undefined;
```

Defined in: [options.svelte.ts:302](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L302)

Called whenever a node is collapsed or expanded.

#### Default

```ts
undefined
```

***

### stores

```ts
stores: boolean | "value-only" | "full";
```

Defined in: [options.svelte.ts:314](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L314)

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

### search

```ts
search: boolean | "highlight" | "filter" | "filter-strict";
```

Defined in: [options.svelte.ts:326](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L326)

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

Defined in: [options.svelte.ts:335](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L335)

Initial multi-term search mode

- `'and'` - nodes must match every term
- `'or'` - nodes can match one of the terms

#### Default

```ts
'or'
```

***

### highlightMatches

```ts
highlightMatches: boolean;
```

Defined in: [options.svelte.ts:343](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L343)

When `search` is enabled, highlight matches in keys,
types and values when typing in the search input box.

#### See

[InspectOptions.search](/api/type-aliases/inspectoptions/#search)

#### Default

```ts
true
```

***

### heading

```ts
heading: boolean | string | Snippet<[boolean]>;
```

Defined in: [options.svelte.ts:349](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L349)

A `string` or `Snippet` that will be rendered as a small heading with a collapse-button for the component.

The snippet parameter indicates if the instance has been collapsed

***

### hotkeys

```ts
hotkeys: 
  | Partial<InspectHotkeys>
  | boolean;
```

Defined in: [options.svelte.ts:359](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L359)

Configures hotkeys using [tinykeys](https://github.com/jamiebuilds/tinykeys) syntax.

Use an object to override defaults, `true` to use defaults and `false` to disable hotkeys

#### See

[InspectHotkeys](/api/type-aliases/inspecthotkeys/)

#### Default

```ts
{ search: 'Shift+$mod+F', expandTop: '$mod+ArrowRight', collapseTop: '$mod+ArrowLeft' }
```

#### Since

0.11.0

***

### disableKeynav

```ts
disableKeynav: boolean;
```

Defined in: [options.svelte.ts:367](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L367)

Disables using arrow keys, home, end, enter and space to navigate or expand/collapse nodes when
a node is focused.

#### Default

```ts
false
```

#### Since

0.11.0

***

### typeToFocus

```ts
typeToFocus: boolean;
```

Defined in: [options.svelte.ts:374](https://github.com/ampled/svelte-inspect-value/blob/fde11f7054ba97b804d19e1d32a836de5c902857/packages/svelte/src/lib/options.svelte.ts#L374)

Enables typing to focus any node with matching text when any node is focused.

#### Default

```ts
true
```

#### Since

0.11.0
