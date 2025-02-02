<script lang="ts">
  import { browser } from '$app/environment'
  import Inspect from '$lib/Inspect.svelte'
  import type { InspectProps } from '$lib/types.js'
  import { addComponent } from '$lib/util.js'
  import HexString from '../custom/HexString.svelte'
  import type { ThemeKeys } from './themes.js'

  const props: InspectProps & { colors: Record<ThemeKeys, string> } = $props()

  const base08Preview = {
    numberType: 123,
    booleanType: true,
    error: new Error('i am an error'),
    tagNames: browser ? new Image() : null,
    get keyPrefixes() {
      return class RandomClass {
        static asdf = ''
      }
    },
  }

  const base09Preview = Symbol('symbol type indicator')
  const base0BPreview = [function funcNames() {}, browser ? document.body : null]
  const base0CPreview = {
    objType: {},
    arrType: [],
    date: new Date(),
    urls: new URL('https://example.com'),
    [Symbol('key')]: Symbol('symbol value color'),
  }
  const base0DPreview = {
    classes: class Test {},
    classInstances: [new Map(), new Set()],
  }
  const base0EPreview = {
    stringType: '<--',
    numberValue: 1234,
    boolValue: true,
    get buttonColor() {
      return props.colors['--base0E']
    },
  }
  const previewBrackets = [[[[[[[[[[[[[[[[[[['end']]]]]]]]]]]]]]]]]]]

  const theming = $derived({
    base00: [props.colors['--base00'], 'background-color'],
    base01: [props.colors['--base01'], 'row-hover-color', 'nilTypeBg', null, undefined],
    base02: [props.colors['--base02'], 'text-selection-background'],
    base03: [props.colors['--base03'], 'border-color', ['expand-button'], 'length color'],
    // base04: [props.colors['--base04']],
    base05: [props.colors['--base05'], 'foreground / text-color'],
    // base06: [props.colors['--base06']],
    // base07: [props.colors['--base07']],
    base08: [props.colors['--base08'], base08Preview],
    base09: [props.colors['--base09'], base09Preview],
    base0A: [props.colors['--base0A'], 'base0A is the string color'],
    base0B: [props.colors['--base0B'], ...base0BPreview],
    base0C: [props.colors['--base0C'], base0CPreview],
    base0D: [props.colors['--base0D'], base0DPreview],
    base0E: [props.colors['--base0E'], base0EPreview],
    // base0F: [props.colors['--base0F']],
    previewBrackets,
  })

  $effect.pre(() => {
    document.body.dataset['attributecolor'] = props.colors['--base0B']
  })
</script>

<Inspect
  customComponents={{
    string: addComponent(HexString, () => ({
      showString: false,
    })),
  }}
  value={theming}
  name="theming"
  expandLevel={2}
  previewDepth={Infinity}
  previewEntries={10}
  {...props}
/>
