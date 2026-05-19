import {
  track,
  bindValue,
  bindChecked,
  RippleObject,
  RippleMap,
  type Tracked,
  effect,
  RippleArray,
} from 'ripple';
import { Inspect } from './lib/Inspect.tsrx';
import { debug } from './lib/context.js';
import type { InspectOptions } from '@inspect/core';
import { funcs } from './values.js';

export component App() {
  debug.set(true);
  let &[count] = track(0);
  let &[counter] = track({ current: 0 });
  let &[showDiv, $showDiv] = track(true);
  let &[visible, $visible] = track(true);
  let &[theme, themeTracked] = track('inspect');
  let &[div] = track();
  let options = new RippleObject<Partial<InspectOptions>>({
    previewDepth: 1,
    previewEntries: 3,
    onCollapseChange: (s) => console.log('state changed:', JSON.stringify(s)),
  });

  effect(() => {
    console.log('options:', options);
  });
  let pushArr = new RippleArray<number>();
  let values = new RippleObject({
    arr: [() => {}],
    funcs,
    pushArr,
    set: new Set([1, 2, 3, 'four']),
    map: new Map<any, any>([
      [1, 1],
      ['2', 2],
      ['wee', 'aaa'],
      [Symbol.for('lol'), 'lol'],
      [{ oops: 'lol' }, 'gag'],
      [new Map([[1, 1]]), 'bab'],
    ]),
  });

  type TransitionParams = {
    visible?: Tracked<boolean>;
    inDOM?: Tracked<boolean>;
  };

  function transition({ visible, inDOM }: TransitionParams) {
    let ele = track<HTMLElement | undefined>();
    let initiallyVisible = false;

    if (visible.value) {
      initiallyVisible = true;
    }

    // effect(() => {
    //   console.log('transition factory effect', {
    //     visible: visible.value,
    //     inDOM: inDOM.value,
    //     ele: ele.value,
    //   })
    // })

    effect(() => {
      if (visible.value && !initiallyVisible) {
        // transition in?
      } else if (visible.value === false && initiallyVisible) {
        // transition out?
        inDOM.value = false;
      }
    });

    return {
      attach: (node: HTMLElement) => {
        // console.log('sup')
        ele.value = node;
        // in?
        return () => {
          // console.log('leaving')
          // ele.value = undefined;
          // out?
        };
      },
      get ele() {
        return ele;
      },
    };
  }

  const test = transition({ visible: $visible, inDOM: $showDiv });

  function onOptionChange(
    e: Event & { currentTarget: HTMLInputElement },
    option: keyof InspectOptions,
    number = true,
  ) {
    let value: string | number;
    if (number) {
      value = e.currentTarget.valueAsNumber;
    }
    // @ts-ignore
    options[option] = value;
  }

  <div class="flex">
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
        counter.current++;
        count++;
        pushArr.push(count);
      }}
    >
      {'+'}
    </button>
    <button
      onClick={() => {
        counter.current--;
        count--;
        pushArr.push(count);
      }}
    >
      {'-'}
    </button>
  </div>

  // <Inspect {theme} values={{ ...values }} {...options} expandLevel={0} />

  <Inspect
    {...options}
    expandLevel={0}
    values={{
      // symb: Symbol.for('s'),
      // foo: 1,
      array: [1, 2, 3, [4]],
      // growingArr: new Array(Math.max(count, 0)).fill(undefined).map((g, i) => i),
      // count,
      // obj: {
      //   bing: 'bong',
      //   get anObject() {
      //     return { a: 1, b: 2, c: 3 };
      //   },
      //   get bingBong() {
      //     return 'bingbong!!';
      //   },
      //   set bingBong(v) {
      //     console.log('setter got val:', v);
      //   },
      //   get errorGetter() {
      //     return 'eh?';
      //   },
      // },
    }}
  />

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
