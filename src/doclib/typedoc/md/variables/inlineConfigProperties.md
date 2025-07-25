---
title:
  - inline-config-properties
  - inlineConfigProperties
---

# inlineConfigProperties

```ts
const inlineConfigProperties: {
  Animate: {
     noanimate: false;
  };
  Border: {
     borderless: false;
  };
  Borderless: {
     borderless: true;
  };
  DarkTheme: {
     theme: "dark";
  };
  DefaultTheme: {
     theme: "inspect";
  };
  DoubleQuotes: {
     quotes: "double";
  };
  DrakTheme: {
     theme: "drak";
  };
  EmbedMedia: {
     embedMedia: true;
  };
  ExpandAll: {
     expandAll: true;
  };
  Heading: {
     heading: true;
  };
  LightTheme: {
     theme: "light";
  };
  NoAnimate: {
     noanimate: true;
  };
  NoHighlight: {
     highlightMatches: false;
  };
  NoLength: {
     showLength: false;
  };
  NoPreview: {
     showPreview: false;
  };
  NoQuotes: {
     quotes: "none";
  };
  NoSearch: {
     search: false;
  };
  NoStores: {
     stores: false;
  };
  NoTools: {
     showTools: false;
  };
  NoTypes: {
     showTypes: false;
  };
  ParseJSON: {
     parseJson: true;
  };
  PlainTheme: {
     theme: "plain";
  };
  Search: {
     search: "filter";
  };
  SearchHighlight: {
     search: "highlight";
  };
  SearchStrict: {
     search: "filter-strict";
  };
  ShowLength: {
     showLength: false;
  };
  ShowPreview: {
     showPreview: false;
  };
  ShowTools: {
     showTools: true;
  };
  ShowTypes: {
     showTypes: false;
  };
  SingleQuotes: {
     quotes: "single";
  };
  StereoTheme: {
     theme: "stereo";
  };
  Stores: {
     stores: true;
  };
  StoreValues: {
     stores: "value-only";
  };
};
```

## Type declaration

### Animate

```ts
readonly Animate: {
  noanimate: false;
};
```

Enable animations

#### Animate.noanimate

```ts
readonly noanimate: false = false;
```

### Border

```ts
readonly Border: {
  borderless: false;
};
```

Render with background color or border

#### Border.borderless

```ts
readonly borderless: false = false;
```

### Borderless

```ts
readonly Borderless: {
  borderless: true;
};
```

Render with no background color or border

#### Borderless.borderless

```ts
readonly borderless: true = true;
```

### DarkTheme

```ts
readonly DarkTheme: {
  theme: "dark";
};
```

#### DarkTheme.theme

```ts
readonly theme: "dark" = 'dark';
```

### DefaultTheme

```ts
readonly DefaultTheme: {
  theme: "inspect";
};
```

#### DefaultTheme.theme

```ts
readonly theme: "inspect" = 'inspect';
```

### DoubleQuotes

```ts
readonly DoubleQuotes: {
  quotes: "double";
};
```

#### DoubleQuotes.quotes

```ts
readonly quotes: "double" = 'double';
```

### DrakTheme

```ts
readonly DrakTheme: {
  theme: "drak";
};
```

#### DrakTheme.theme

```ts
readonly theme: "drak" = 'drak';
```

### EmbedMedia

```ts
readonly EmbedMedia: {
  embedMedia: true;
};
```

Enable embedding images and sounds

#### EmbedMedia.embedMedia

```ts
readonly embedMedia: true = true;
```

### ExpandAll

```ts
readonly ExpandAll: {
  expandAll: true;
};
```

Initially expand all props

#### ExpandAll.expandAll

```ts
readonly expandAll: true = true;
```

### Heading

```ts
readonly Heading: {
  heading: true;
};
```

Show heading with search (if enabled) and utility buttons

#### Heading.heading

```ts
readonly heading: true = true;
```

### LightTheme

```ts
readonly LightTheme: {
  theme: "light";
};
```

#### LightTheme.theme

```ts
readonly theme: "light" = 'light';
```

### NoAnimate

```ts
readonly NoAnimate: {
  noanimate: true;
};
```

Disable animations

#### NoAnimate.noanimate

```ts
readonly noanimate: true = true;
```

### NoHighlight

```ts
readonly NoHighlight: {
  highlightMatches: false;
};
```

Disable highlighting text matching search query

#### NoHighlight.highlightMatches

```ts
readonly highlightMatches: false = false;
```

### NoLength

```ts
readonly NoLength: {
  showLength: false;
};
```

Disable display of counts of object entries, array items, string lengths etc.

#### NoLength.showLength

```ts
readonly showLength: false = false;
```

### NoPreview

```ts
readonly NoPreview: {
  showPreview: false;
};
```

Disable preview of nested values

#### NoPreview.showPreview

```ts
readonly showPreview: false = false;
```

### NoQuotes

```ts
readonly NoQuotes: {
  quotes: "none";
};
```

#### NoQuotes.quotes

```ts
readonly quotes: "none" = 'none';
```

### NoSearch

```ts
readonly NoSearch: {
  search: false;
};
```

Disable search functionality

#### NoSearch.search

```ts
readonly search: false = false;
```

### NoStores

```ts
readonly NoStores: {
  stores: false;
};
```

Disable inspecting Svelte store / observables

#### NoStores.stores

```ts
readonly stores: false = false;
```

### NoTools

```ts
readonly NoTools: {
  showTools: false;
};
```

Disable row tools

#### NoTools.showTools

```ts
readonly showTools: false = false;
```

### NoTypes

```ts
readonly NoTypes: {
  showTypes: false;
};
```

Disable display of types of values

#### NoTypes.showTypes

```ts
readonly showTypes: false = false;
```

### ParseJSON

```ts
readonly ParseJSON: {
  parseJson: true;
};
```

Enable parsing stringified JSON arrays and Objects

#### ParseJSON.parseJson

```ts
readonly parseJson: true = true;
```

### PlainTheme

```ts
readonly PlainTheme: {
  theme: "plain";
};
```

#### PlainTheme.theme

```ts
readonly theme: "plain" = 'plain';
```

### Search

```ts
readonly Search: {
  search: "filter";
};
```

Set search mode to `'filter'`

#### Search.search

```ts
readonly search: "filter" = 'filter';
```

### SearchHighlight

```ts
readonly SearchHighlight: {
  search: "highlight";
};
```

Set search mode to `'highlight'`

#### SearchHighlight.search

```ts
readonly search: "highlight" = 'highlight';
```

### SearchStrict

```ts
readonly SearchStrict: {
  search: "filter-strict";
};
```

Set search mode to `'filter-strict'`

#### SearchStrict.search

```ts
readonly search: "filter-strict" = 'filter-strict';
```

### ShowLength

```ts
readonly ShowLength: {
  showLength: false;
};
```

Enable display of counts of object entries, array items, string lengths etc.

#### ShowLength.showLength

```ts
readonly showLength: false = false;
```

### ShowPreview

```ts
readonly ShowPreview: {
  showPreview: false;
};
```

Enable preview of nested values

#### ShowPreview.showPreview

```ts
readonly showPreview: false = false;
```

### ShowTools

```ts
readonly ShowTools: {
  showTools: true;
};
```

Enable row tools

#### ShowTools.showTools

```ts
readonly showTools: true = true;
```

### ShowTypes

```ts
readonly ShowTypes: {
  showTypes: false;
};
```

Enable display of types of values

#### ShowTypes.showTypes

```ts
readonly showTypes: false = false;
```

### SingleQuotes

```ts
readonly SingleQuotes: {
  quotes: "single";
};
```

#### SingleQuotes.quotes

```ts
readonly quotes: "single" = 'single';
```

### StereoTheme

```ts
readonly StereoTheme: {
  theme: "stereo";
};
```

#### StereoTheme.theme

```ts
readonly theme: "stereo" = 'stereo';
```

### Stores

```ts
readonly Stores: {
  stores: true;
};
```

Enable inspecting Svelte stores / observables. Sets store-mode to `'full'`

#### Stores.stores

```ts
readonly stores: true = true;
```

### StoreValues

```ts
readonly StoreValues: {
  stores: "value-only";
};
```

Enable inspecting Svelte stores / observables. Sets store-mode to `'value-only'`

#### StoreValues.stores

```ts
readonly stores: "value-only" = 'value-only';
```
