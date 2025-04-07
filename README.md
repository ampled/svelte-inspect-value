# Svelte Inspect Value

[![NPM Version](https://img.shields.io/npm/v/svelte-inspect-value)](https://www.npmjs.com/package/svelte-inspect-value)
[![GitHub Repo stars](https://img.shields.io/github/stars/ampled/svelte-inspect-value)](https://github.com/ampled/svelte-inspect-value)

![inspect screenshot](https://raw.githubusercontent.com/ampled/svelte-inspect-value/refs/heads/main/readme.png)

- [Demo and documentation](https://inspect.eirik.space)
- [Svelte Playground](https://svelte.dev/playground/956365d6905c44298234ff4d9c60741e?version=5.17.3)

## Description

An ambitious value inspector component in the veins of `svelte-json-tree` and `react-json-view`.

It aims to be a valuable devtool for monitoring state and debugging.

## Installation and use

Install `svelte-inspect-value` with your favourite package manager.

```html
<script>
  import Inspect from 'svelte-inspect-value'

  let name = $state('')
  let age = $state(42)
</script>

<Inspect value="{{name,age}}" />
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
- customizable theming
- syntax highlighting for functions and html elements using hljs
- embed media if a string value is a link / path ending with an embeddable image or audio file extension (disabled by default)

### Props

| **Name**       | **Type**                     | **Description**                                                                                           | **Default** |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| value          | any                          | value to inspect. can be any javascript value                                                             | `undefined` |
| name           | string                       | name of outer value. displayed as key                                                                     | `undefined` |
| **Options**    |                              | _Can also be set using `setGlobalInspectOptions` or `InspectOptionsProvider`_                             |
| stringCollapse | boolean                      | set a max display length for string values. 0 means full string will be displayed                         | `0`         |
| showLength     | boolean                      | display length of arrays or strings and number of nested entries in objects / maps etc                    | `true`      |
| showTypes      | boolean                      | display type labels before values e.g. "string" / "number." Mainly affects basic primitive types          | `true`      |
| showPreview    | boolean                      | display preview of nested values of object, array, map, set etc.                                          | `true`      |
| showTools      | boolean                      | display row of utility-"tools" when hovering an entry                                                     | `true`      |
| noanimate      | boolean                      | disable animations / transitions                                                                          | `false`     |
| embedMedia     | boolean                      | embed images and audio if a string value is a path or url that ends with an image or audio file extension | `false`     |
| theme          | string                       | set color theme class available built-in themes: inspect,drak,stereo,dark,light,plain                     | `'inspect'` |
| expandAll      | boolean                      | initially expand all nodes. can be a performance hitch with a lot of entries                              | `false`     |
| expandLevel    | number                       | default level of initially expanded nested nodes                                                          | `1`         |
| expandPaths    | array                        | array of (string) paths to initially expanded nodes                                                       | `[ ]`       |
| borderless     | boolean                      | remove background color, border and padding                                                               | `false`     |
| quotes         | `'single'\|'double'\|'none'` | quote type for string values.                                                                             | `'single'`  |
| elementView    | `'simple'\|'full'`           | determines what properties are shown when inspecting html elements.                                       | `'simple'`  |
| renderIf       | `any \| () => any`           | render `Inspect` if value or return value is truthy                                                       | `true`      |
| parseJson      | boolean                      | if enabled, parse strings that start with `'{'` or `'['` and display the parsed value                     | `false`     |

[Full list of props here](https://inspect.eirik.space/getting-started#props)

# Acknowledgements

- the "drak"-theme is based on the [dracula](https://draculatheme.com/) color scheme
- the "stereo"-theme is based on the [monokai](https://monokai.pro/) color scheme
