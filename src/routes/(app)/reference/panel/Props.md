<h2 id="props">Props</h2>

This variation has all the same props as `Inspect` (including [`InspectOptions`](/reference/inspect-options))
in addition to the following props exclusive to `Inspect.Panel`.

<h3 id="appearance">appearance</h3>

`PanelAppearance`

```ts
type PanelAppearance = 'solid' | 'glassy' | 'floating' | 'dense' | (string & {})
```

Sets appearance of panel.

Can be `'solid'|'glassy'|'dense'|'floating'`

#### Default

`'solid'`

<h3 id="children">children</h3>

`Snippet`

Extra elements to be added at the bottom of the Panel

#### Default

`undefined`

<h3 id="hideGlobalValues">hideGlobalValues</h3>

`boolean`

Don't display "global" values added with `addToPanel`

#### Default

`false`

<h3 id="hideToolbar">hideToolbar</h3>

```ts
hideToolbar: boolean
```

Don't render Panel toolbar

#### Default

`false`

<h3 id="opacity">opacity</h3>

```ts
opacity: boolean
```

Apply opacity to the panel when not hovered

#### Default

`false`

<h3 id="open">open</h3>

```ts
open: boolean
```

Initially open panel

#### Default

`false`

<h3 id="openOnHover">openOnHover</h3>

```ts
openOnHover: boolean
```

Panel should open on hover.

Enabling this will leave part of the panel visible for easier reach.

#### Default

`false`

<h3 id="position">position</h3>

```ts
position: [YPos] | [YPos, XPos]
```

Initial panel position

Format: `[<y-position>, <x-position>]`

y-position can be one of `'top' | 'bottom' | 'middle' | 'full-y'`

x-position can be one of `'left' | 'right' | 'center' | 'full-x'`

#### Default

`['top', 'right']`

<h3 id="resize">resize</h3>

```ts
resize: boolean
```

Enable resizing

#### Default

`true`
