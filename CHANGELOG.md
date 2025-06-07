# Changelog

## 0.8.0 Search, Text Highlighting and Keyboard Controls (June 2025)

This update largely focuses on improving user-interactions of the `Inspect`-component as well as improving its look and feel.

### Search / Filter

If the option / prop `search` is set to `'highlight'`, `true | 'filter'` or `'filter-strict'`, a search bar will be visible in the heading of the Inspect-component. This feature is disabled by default for now.

Typing a query and hitting the enter key (or clicking the magnifying glass) performs a deep indexed search of inspected values, and depending on the value of the `search` option will display search results in one of three ways:

- `'highlight'` — matching value-nodes (and their parents)will be expanded and highlighted with their "bullets" or expand-buttons set to a different color.
- `'filter' | true` — non-matching value-nodes will be hidden, except for their siblings and parents
- `'filter-strict'` — only matching value-nodes and parent nodes will be displayed

By default, a query can match paths, types and the value itself. You can narrow/expand searches with multiple terms, and/or-mode and field-prefixes like `path:`, `type:` and `value:`.

Look for all the details on how the search-functionality works in the [documentation](https://inspect.eirik.space) (look for the "usage"-page.)

### Text Highlighting

The search-bar will also result in matching text being highlighted as you type queries. This is enabled by default and can be disabled by setting the option / prop `highlightMatches` to `false`.

While Text Highlighting also supports narrowing with multiple terms and field-prefixes, searching and text highlighting is not 1:1 and you might not see highlighted values count as matches. This is mostly dependent on "and/or"-mode and whether or not a value was indexable.

### Keyboard Controls

Value-nodes are now focusable and keyboard-control for controlling focus and expandable nodes have been implemented.

Some examples:

- <kbd>↑</kbd> / <kbd>↓</kbd> — focuses previous/next nodes
- <kbd>→</kbd> / <kbd>←</kbd> — expands / collapses expandable nodes or jumps in and out of an expandable "scope"
- <kbd>Enter</kbd> — expand a node and focus its first child node.
- <kbd>ctrl</kbd> / <kbd>cmd</kbd> + <kbd>f</kbd> — focus the search bar
- <kbd>ctrl</kbd> / <kbd>cmd</kbd> + <kbd>e</kbd> — expand all top-level nodes
- <kbd>ctrl</kbd> / <kbd>cmd</kbd> + <kbd>c</kbd> — collapse all top-level nodes

See the full list of keyboard-shortcuts in the documentation.

### Type to Focus

While a node is focused, type anything and any visible node with matching text will be focused.

### Animation / transition speed changes

_Suggested by [@braebo](https://github.com/braebo) ([#40](https://github.com/ampled/svelte-inspect-value/issues/40))_

The transition speed for expanding / collapsing nodes was set to 600ms, which was too many milliseconds when a quick google search suggests between 100 and 500ms for interactivity on the web.

The new default speed has been lowered 250ms, but can be increased/decreased with the new option / prop `animRate`. Setting `animRate` to `0.5` will double transition speeds and setting it to `2` will halve them. By default it is set to `1`. This setting controls both Svelte in/out transitions as well as CSS-animations like hover-effects, opening/closing panels, etc.

The new `easing`-prop takes any easing function with the same signature as easings imported from `svelte/easing`. This can be used to control expand/collapse transitions further.

### Inspect.Panel `onSettingsChange` callback

_Suggested by [@mifopen](https://github.com/mifopen) ([#38](https://github.com/ampled/svelte-inspect-value/issues/38))_

A callback that runs if any Panel-settings are changed using the UI.
This can be used for persisting Panel-settings.

### Bugs fixed

- Values added to `Inspect.Panel` from other `Inspect`-instances are no longer removed if their parent nodes were collapsed, but "cleaned up" when the `Inspect`-instance unmounts.
- Internally, not all nodes had all props forwarded, meaning they wouldn't have notes displayed among other things.

### Other

- `Inspect.Values` or `Inspect(.Panel)` with the `values`-prop set now have an expand/collapse and "log to console"-buttons in its heading (if enabled)
- The `heading`-prop is now considered an option-prop meaning it can be configured via option-providers (and `Inspect.Values` can have a heading)
- The `heading`-prop can now be set to `true` to simply display it. It will also render if search is enabled
- If `heading` is a `Snippet`, it now has a boolean parameter indicating if the instance is collapsed
- New, nicer and more consistent icons for icon-buttons in node-toolbar and headings.
- **Removed default inline/left/right padding**
  - The CSS-variables `--padding` and `--padding-compact` can be used to restore the original `0.25em` padding if desired
- New CSS-variable: `--text-search-highlight-color` — sets the background-color for highlighted text and bullet/collapse-button of matching nodes. Set to `var(--base0A)` by default (string color)
- Removed unique styling for node tool-buttons when `borderless` was active (Just one less thing to maintain)

---

_Earlier change notes on github:_ https://github.com/ampled/svelte-inspect-value/releases
