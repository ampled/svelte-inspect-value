import { getAllProperties, type TypeViewProps } from '@inspect/core';
import { Expandable } from './Expandable.tsrx';
import { Node } from '../Node.tsrx';
import { PropertyList } from './PropertyList.tsrx';
import { Preview } from './Preview.tsrx';
import { ctx, previewLevelCtx } from '../context.js';
import { effect, track } from 'ripple';

export component ArrayView(&{
  value: array = [],
  path,
  type,
  showKey,
  ...rest
}: TypeViewProps<unknown[]>) {
  const previewLevel = previewLevelCtx.get();

  let &[otherprops] = track(
    () => getAllProperties(array).filter((prop) => {
      if (typeof prop === 'string') {
        return /\d+/.test(prop) === false && prop !== 'length';
      }
      return true;
    }),
  );

  let &[keys] = track(() => [...array.keys(), ...otherprops]);

  <Expandable
    value={array}
    length={array.length}
    {type}
    {path}
    showKey={showKey && previewLevel === 0}
    valuePreview={component(&{ showPreview, value }) {
      <Preview
        {path}
        {showPreview}
        list={value as unknown[]}
        prefix="["
        postfix="]"
        showKey={false}
      />
    }}
    {...rest}
  >
    <PropertyList
      value={array}
      {type}
      {keys}
      item={component({ key }) {
        <Node value={array?.[key as number]} {key} {path} />
      }}
    />
  </Expandable>
}
