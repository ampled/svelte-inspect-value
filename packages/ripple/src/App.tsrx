import { track, bindValue, bindChecked, RippleObject, type Tracked, effect } from 'ripple'
import { Inspect } from './lib/Inspect.tsrx'
import type { InspectOptions } from '@inspect/core'

export component App() {
  let &[count] = track(0)
  let &[counter] = track({ current: 0 })
  let &[showDiv, $showDiv] = track(true)
  let &[visible, $visible] = track(true)
  let &[theme, themeTracked] = track('inspect')
  let &[div] = track()
  let options = new RippleObject<Partial<InspectOptions>>({
    previewDepth: 1,
    previewEntries: 3,
  })
  let values = new RippleObject({
    symb: Symbol.for('s'),
    foo: 1,
    array: [1, 2, 'three', [[4]]],
    reg: /regexp/,
    obj: {
      bing: 'bong',
      bong: {
        msg: 'ding',
      },
    },
  })

  type TransitionParams = {
    visible?: Tracked<boolean>;
    inDOM?: Tracked<boolean>;
  }

  function transition({ visible, inDOM }: TransitionParams) {
    let ele = track<HTMLElement | undefined>()
    let initiallyVisible = false
    console.log('factory')

    if (visible.value) {
      initiallyVisible = true
    }

    effect(() => {
      console.log('transition factory effect', {
        visible: visible.value,
        inDOM: inDOM.value,
        ele: ele.value,
      })
    })

    effect(() => {
      if (visible.value && !initiallyVisible) {
        // transition in?
      } else if (visible.value === false && initiallyVisible) {
        // transition out?
        inDOM.value = false
      }
    })

    return {
      attach: (node: HTMLElement) => {
        console.log('sup')
        ele.value = node
        // in?
        return () => {
          console.log('leaving')
          // ele.value = undefined;
          // out?
        }
      },
      get ele() {
        return ele
      },
    }
  }

  const test = transition({ visible: $visible, inDOM: $showDiv })

  function onOptionChange(
    e: Event & { currentTarget: HTMLInputElement },
    option: keyof InspectOptions,
    number = true,
  ) {
    let value: string | number
    if (number) {
      value = e.currentTarget.valueAsNumber
    }
    // @ts-ignore
    options[option] = value
  }

  <Inspect {theme} expandLevel={0} values={{ ...values }} {...options} />

  <label>
    {'theme'}
    <select {ref bindValue(themeTracked)}>
      <option>{'inspect'}</option>
      <option>{'drak'}</option>
      <option>{'stereo'}</option>
    </select>
  </label>
  <label>
    {'preview depth'}
    <input
      type="number"
      value={options.previewDepth}
      onInput={(e) => onOptionChange(e as any, 'previewDepth')}
    />
  </label>
  <label>
    {'preview entries'}
    <input
      type="number"
      value={options.previewEntries}
      onInput={(e) => onOptionChange(e as any, 'previewEntries')}
    />
  </label>

  <button
    onClick={() => {
      counter.current++
      count++
    }}
  >
    {'+'}
  </button>
  <button
    onClick={() => {
      counter.current--
      count--
    }}
  >
    {'-'}
  </button>

  <label>
    {'show'}
    <input type="checkbox" {ref bindChecked($visible)} />
  </label>

  if (showDiv) {
    <div {ref test.attach}>{'hello'}</div>
  }

  <style>
    .appear {
      opacity: 1;
      transition: all 500ms ease-in;
      overflow: hidden;

      @starting-style {
        opacity: 0;
      }
    }
  </style>
}
