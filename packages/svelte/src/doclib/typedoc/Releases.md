## [0.7.2](https://github.com/ampled/svelte-inspect-value/compare/v0.7.1...v0.7.2) (2025-04-28)


### Bug Fixes

* dont expand / collapse on row doubleclick / key click if collapsebutton also disabled ([4708f2c](https://github.com/ampled/svelte-inspect-value/commit/4708f2c41b5dd8fd36b7cdaf3f9052e015ec016c))
* vastly reduce amount of properties with transitions (css) ([17fcb33](https://github.com/ampled/svelte-inspect-value/commit/17fcb33d4b204ff2639dc585ef71444916f5f109))




## [0.7.1](https://github.com/ampled/svelte-inspect-value/compare/v0.7.0...v0.7.1) (2025-04-26)


### Bug Fixes

* use smaller image in readme ([4bea692](https://github.com/ampled/svelte-inspect-value/commit/4bea692af1f014a2d9d73efda75306fdc65ab15c))
  * also dont use "readme" for image file name to prevent it to be bundled in npm package




# [0.7.0](https://github.com/ampled/svelte-inspect-value/compare/v0.6.2...v0.7.0) (2025-04-26)

### Features

* `Inspect.Panel` - a fixed position drawer/panel version of `Inspect` ([506a81f](https://github.com/ampled/svelte-inspect-value/commit/506a81f9b435d27d19973d8f7df2c62bd98d5ed4))
* new option for displaying stores - `'value-only'` - simply shows store value, skipping extra properties on store / observable. Displays a note that it's a store. ([6a649ff](https://github.com/ampled/svelte-inspect-value/commit/6a649ff5d48d78c7b0af62cf02fa52892c483ddb))
* new prop `values` - like `Inspect.Values`  will list all enumerable properties of passed value ([781331a](https://github.com/ampled/svelte-inspect-value/commit/781331a9b71a0aa35757f84cf590ed0273ce3695))
* Move position of node notes ("json" / "store" etc.)

### Bug Fixes

* object view could error if value went from object to undefined or null ([6946c57](https://github.com/ampled/svelte-inspect-value/commit/6946c57f813e1dbfe12e9425bdf0e0d8def06047))
* pass restprops to promiseview ([c931d0e](https://github.com/ampled/svelte-inspect-value/commit/c931d0eedfa01984cbd9280c6bfa17f9f84341c1))




## [0.6.2](https://github.com/ampled/svelte-inspect-value/compare/v0.6.1...v0.6.2) (2025-04-07)


### Bug Fixes

* fix readme ([c4520f7](https://github.com/ampled/svelte-inspect-value/commit/c4520f74c39bab417bd2859e1336f82f25ee1fb6))




## [0.6.1](https://github.com/ampled/svelte-inspect-value/compare/v0.6.0...v0.6.1) (2025-04-07)


### Bug Fixes

* add jsdoc to exports ([4b01438](https://github.com/ampled/svelte-inspect-value/commit/4b014385e3424e1213ebcf9cdfd01d1afe07ce44))




# [0.6.0](https://github.com/ampled/svelte-inspect-value/compare/v0.5.0...v0.6.0) (2025-04-07)


### Bug Fixes

* handle asyncgenerator and asyncIterator ([9c05a4b](https://github.com/ampled/svelte-inspect-value/commit/9c05a4b44ce6b7e93c82897bee4fb61127aca082))
* InspectErrorView now hides error-value behind a getter as to avoid recursive erroring ([0f9b949](https://github.com/ampled/svelte-inspect-value/commit/0f9b9499f666cf3abc22604cd50c1d83c8e5df18))
* make max initial expandLevel 30 to avoid range error ([b169660](https://github.com/ampled/svelte-inspect-value/commit/b169660d7f46b19f5a0bb389e2df5f3db26d85b6))


### Features

* "plain" theme now uses currentColor and css color-mix to make what should be a readable theme ([74eb078](https://github.com/ampled/svelte-inspect-value/commit/74eb078e7768e74fb87c7db202048f12644f6315))
* `Inspect.Values`, a version of `Inspect` that will inspect any value passed to it. It inherits options set via `setGlobalInspectOptions` / `InspectOptionsProvider` but can also be configured using `Inspect.Values.withOptions` or chainable inline configurations in the template, like so: `<Inspect.Values.Config.DarkTheme.Ok />` ([7598ce1](https://github.com/ampled/svelte-inspect-value/commit/7598ce1b95bc2a629780936ab47124508315c70b))
* add "none" alternative to quotes prop ([7574fb0](https://github.com/ampled/svelte-inspect-value/commit/7574fb06719cf8716178c9d2deed77b8636341c1))




# [0.5.0](https://github.com/ampled/svelte-inspect-value/compare/v0.4.1...v0.5.0) (2025-03-17)


### Bug Fixes

* also display name of object constructor as type when the constructor does not start with "class" ([dfad305](https://github.com/ampled/svelte-inspect-value/commit/dfad305168d60544a1c3c413669d7abc8cb755d0))
* avoid passing non html elements to html view. inspecting `document` should now work. ([a5b87e5](https://github.com/ampled/svelte-inspect-value/commit/a5b87e530bd7099dac73f3c3edbe1120e1a3a642))
* don't display name, length and prototype as "static" when inspecting class constructors ([f7093b8](https://github.com/ampled/svelte-inspect-value/commit/f7093b8e5d9b8d66d304c959e41de80c2665d89a))
* enable undefined to be displayed when previewing single values (e.g. promise results, getters, stores) ([ab4c000](https://github.com/ampled/svelte-inspect-value/commit/ab4c00009c5d43dace693aad6c1174efde21e0c3))


### Features

* support for stores and observables. enable/disable with `stores` prop. enabled by default. ([10980ff](https://github.com/ampled/svelte-inspect-value/commit/10980ff49e09b8c0f61b99478d77fb1415d27996))




## [0.4.1](https://github.com/ampled/svelte-inspect-value/compare/v0.4.0...v0.4.1) (2025-03-11)


### Bug Fixes

* Fixed caret button not displaying correctly in safari ([fb7a9b8](https://github.com/ampled/svelte-inspect-value/commit/fb7a9b865c603efb3c9b53853357a9190f40c928))
* Handle `--indent` css var without calculations ([7e9eeed](https://github.com/ampled/svelte-inspect-value/commit/7e9eeed723a9c1f9e17079bbb08b2e5217ee0033))
  * Add `--padding` and `--padding-compact` css vars
  * Add `--indent-compact` css var
* Make buttons not trigger expand/collapse doubleclick when clicking fast ([5e4d1db](https://github.com/ampled/svelte-inspect-value/commit/5e4d1db6ae4c98b4ab48c80a0ac2263a842778b2))




# [0.4.0](https://github.com/ampled/svelte-inspect-value/compare/v0.3.1...v0.4.0) (2025-03-09)


### Bug Fixes

Avoid any derived / effect using any option to be re-run when changing any (unrelated) option prop.  This results in a big performance boost when changing options. ([0b00ad3](https://github.com/ampled/svelte-inspect-value/commit/0b00ad3940b0040b7461de7a59b282b75f903c3e))


### Features

Added new props `onCopy`, `canCopy` and `onLog` allowing implementing custom functionality for the "copy" and "log"-buttons. ([875b1d3](https://github.com/ampled/svelte-inspect-value/commit/875b1d37cbb69dd93ca9571f8fddda39f0c25384))

Example:

```svelte
<Inspect
   onCopy={(value, type, path) => { /* custom copy function */ }}
   canCopy={(value, type, path) => { /* show / hide copy button if returns true */ }}
   onLog={(value, type, path) => { /* custom log function */ }}
/>
```
## [0.3.1](https://github.com/ampled/svelte-inspect-value/compare/v0.3.0...v0.3.1) (2025-03-04)


### Bug Fixes

* avoid nested hover effect in preview ([ed84629](https://github.com/ampled/svelte-inspect-value/commit/ed84629e7087ef92d3ac2684a153805d98085ae1))
* ensure keys have no hover effect when in preview scope ([92fc262](https://github.com/ampled/svelte-inspect-value/commit/92fc262e3f57fe72f74073453412cd2f21fb5ef6))
* indent border-color for string, error and function (broken in previous release) ([b56df83](https://github.com/ampled/svelte-inspect-value/commit/b56df83334b11e5686984dd72967295a6ef02583))
* update function syntax highlight to properly use new css-var name introduced in the previous release ([0a635d4](https://github.com/ampled/svelte-inspect-value/commit/0a635d404d71315674f4dadda933a3fae3d64752))




# [0.3.0](https://github.com/ampled/svelte-inspect-value/compare/v0.2.3...v0.3.0) (2025-02-28)


### Features

## Extended Theming

It is now possible to override a ton of different colors and properties of the `Inspect` component. The base16 system is kept intact, but the internal mapping of base16-colors to roles can be overridden with a custom css theme-class or by passing css-vars to the component directly like so: 

```svelte
<Inspect {value} --caret-color="white" --caret-focus-color="hotpink" />
```

📖 [Docs](https://inspect.eirik.space/theming/define)
📋 [Full list of overrideable CSS variables](https://inspect.eirik.space/theming/vars)




## [0.2.3](https://github.com/ampled/svelte-inspect-value/compare/v0.2.2...v0.2.3) (2025-02-26)


### Bug Fixes

- setGlobalOptions should receive a function ([814607d](https://github.com/ampled/svelte-inspect-value/commit/814607de278f98362b682e43208efd24f4cb9b0a))
- correct spelling for InspectOptionsProvider export
- expandable: check options while checking initial expand state to avoid "intro" transition playing if it should be expanded (was collapsed by default)




## [0.2.2](https://github.com/ampled/svelte-inspect-value/compare/v0.2.1...v0.2.2) (2025-02-24)


### Bug Fixes

* disable button blur transition if noanimate is set ([6cb487f](https://github.com/ampled/svelte-inspect-value/commit/6cb487f64a6db4b52af7e2fcc195928ca69d3d7b))




## [0.2.1](https://github.com/ampled/svelte-inspect-value/compare/v0.2.0...v0.2.1) (2025-02-24)


### Bug Fixes

* add `type="button"` to Tools.svelte and Key.svelte to prevent closing dialogs ([#20](https://github.com/ampled/svelte-inspect-value/issues/20)) ([5615d32](https://github.com/ampled/svelte-inspect-value/commit/5615d326eda594122a58047135b9eee680f3017a))




# [0.2.0](https://github.com/ampled/svelte-inspect-value/compare/v0.1.4...v0.2.0) (2025-02-24)

### Features

* Added new option / prop: `parseJson` (https://github.com/ampled/svelte-inspect-value/pull/19)
  * If `true`, string nodes will check if the string starts with `'{'` or `'['` and attempt to parse it as JSON and display the parsed value.
  * A note will be shown to indicate that an object or array is parsed from a string
* Add `expandPath` prop/option
   * Array of string path to initially expanded nodes
* Use original `inspect-theme` theme as default
* export InspectOptions type ([d52649c](https://github.com/ampled/svelte-inspect-value/commit/d52649c0e6f0243c322319f5b020576fe7cfdca0))


### Bug fixes

* Disable key hover style/title if in preview scope
## [0.1.4](https://github.com/ampled/svelte-inspect-value/compare/v0.1.3...v0.1.4) (2025-02-22)


### Performance Improvements

* improve expandAll performance ([#18](https://github.com/ampled/svelte-inspect-value/issues/18)) ([41d6251](https://github.com/ampled/svelte-inspect-value/commit/41d62515d6f9625423554af0d8e14f5d15280266))




