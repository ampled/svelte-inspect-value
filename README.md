# Svelte Inspect Value

[![NPM Version](https://img.shields.io/npm/v/svelte-inspect-value)](https://www.npmjs.com/package/svelte-inspect-value)
[![GitHub Repo stars](https://img.shields.io/github/stars/ampled/svelte-inspect-value)](https://github.com/ampled/svelte-inspect-value)

![inspect screenshot](https://raw.githubusercontent.com/ampled/svelte-inspect-value/refs/heads/main/readme.png)

- [Demo and documentation](https://inspect.eirik.space)
- [Svelte Playground](https://svelte.dev/playground/956365d6905c44298234ff4d9c60741e?version=5.17.3)

## Description

A collection of ambitious value inspector components in the veins of `svelte-json-tree` and `react-json-view`.

It aims to be a valuable devtool for monitoring state and debugging.

## Installation and use

Install `svelte-inspect-value` with your favourite package manager.

```svelte
<script>
  import Inspect from 'svelte-inspect-value'

  let name = $state('')
  let age = $state(42)
</script>

<Inspect value={{ name, age }} />
<!-- or -->
<Inspect.Values {name} {age} />
```

### Features

- view state in a tree-view
- aims to support most JavaScript built-ins with specialized views displaying information relevant to to developers, including:
  - `Map` and `Set`
  - `Promise`
  - `Date`
  - `URL` and `URLSearchParams`
  - `TypedArray`
  - HTML elements
  - `Function`
  - `Class`
  - Svelte stores and Observables
- Fixed position drawer / panel component
- customizable theming
- syntax highlighting for functions and html elements using hljs
- embed media if a string value is a link / path ending with an embeddable image or audio file extension (disabled by default)

# Acknowledgements

- the "drak"-theme is based on the [dracula](https://draculatheme.com/) color scheme
- the "stereo"-theme is based on the [monokai](https://monokai.pro/) color scheme
