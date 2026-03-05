# Svelte Inspect Value

[![NPM Version](https://img.shields.io/npm/v/svelte-inspect-value)](https://www.npmjs.com/package/svelte-inspect-value)
[![GitHub Repo stars](https://img.shields.io/github/stars/ampled/svelte-inspect-value)](https://github.com/ampled/svelte-inspect-value)

![inspect screenshot](https://raw.githubusercontent.com/ampled/svelte-inspect-value/refs/heads/main/img.webp)

- [Demo and documentation](https://inspect.eirik.space)
- [Svelte Playground](https://svelte.dev/playground/956365d6905c44298234ff4d9c60741e?version=5)

## Description

A collection of value inspector components.

It aims to be a valuable devtool for monitoring state and debugging, but should be usable for presenting data in any situation that calls for it.

### Features

- Very configurable
- Simple configuration using provider function or component
- Fixed position drawer / panel component
- Deep nested search / filter with text highlighting
- Keyboard controls and shortcuts to easily navigate between values
- Built-in light and dark themes
- Customizable theming using base16 color schemes or 50+ css variabes
- Syntax highlighting for functions and HTML elements using [highlight.js](https://highlightjs.org/)
- Embedding images and audio if a string value is a link / path with the proper file extension
- Parsing stringified JSON arrays and objects
- Full TypeScript support
- Custom Components (beta)
- Support for most JavaScript built-ins with specialized views displaying information relevant to to developers, including:
  - Objects, arrays, maps and sets
  - Iterators\*
  - Getters and setters\*
  - Dates
  - URLs and URL Search Params
  - Typed Arrays
  - HTML elements
  - Functions
  - Class constructors and instances
  - Promises
  - Svelte stores and Observables

_\* iterators and getters need to be manually iterated or activated to not trigger side effects_

## Installation and use

Install `svelte-inspect-value` with your favourite package manager.

```svelte
<script>
  import Inspect, {InspectOptionsProvider, setGlobalInspectOptions} from 'svelte-inspect-value'

  let name = $state('')
  let age = $state(42)

  // options provider function
  setGlobalInspectOptions({ ... })
</script>

<!-- options provider component (alternative to function) -->
<InspectOptionsProvider options={{ theme: 'stereo', search: true, showTypes: false }}>
  <!-- base component -->
  <Inspect value={{ name, age }} />
  <!-- base component variant that inspects any prop as individual values -->
  <Inspect.Values {name} {age} />
  <!-- fixed position panel -->
  <Inspect.Panel values={{ name, age }}>
</InspectOptionsProvider>
```

### Basic props

These props are used for `Inspect` and `Inspect.Panel`

- `values` - an object or array / iterable of values to be inspected
- `value` - a single value to be inspected
- `name` - a display name for value passed with `value`-prop

The props `value` and `name` will not be used if the `values`-prop is set.

See the following pages in the documentation for a full overview of props:

- [`InspectOptions`](https://inspect.eirik.space/docs/types/InspectOptions)
- [`PanelProps`](https://inspect.eirik.space/docs/types/PanelProps)

### Configuring

`Inspect` and `Inspect.Panel` can be configured using any property of `InspectOptions` by setting them as props directly on the component, but the simplest method is using the provider method shown in the example above, leaving you able to overwrite any global options using props if needed.

`Inspect.Values` does not take any configuration props as any prop will simply be inspected, so the provider method is recommended. See the [documentation](https://inspect.eirik.space/reference/values#configuring) on how to configure `Inspect.Values` without using providers.

# Acknowledgements

- Focus management implementation is heavily based on code from [`svelte-inspect`](https://github.com/trbrc/svelte-inspect)
- The "drak"-theme is based on the [dracula](https://draculatheme.com/) color scheme
- The "stereo"-theme is based on the [monokai](https://monokai.pro/) color scheme
- Persistence-logic is borrowed from [runed](https://runed.dev) with some modifications
