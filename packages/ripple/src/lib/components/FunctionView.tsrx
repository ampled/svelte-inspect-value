import type { TypeViewProps } from '@inspect/core';
import { track } from 'ripple';
import { previewLevelCtx } from '../context.js';
import { Expandable } from './Expandable.tsrx';
import { FunctionBody } from './FunctionBody.tsrx';

type FunctionType = 'function' | 'asyncfunction' | 'generatorfunction' | 'asyncgeneratorfunction';

type Props = TypeViewProps<() => unknown, FunctionType>;

export component FunctionView(&{ value, key, type, path, ...rest }: Props) {
  const previewLevel = previewLevelCtx.get();
  let isMultiLine = track(() => value.toString().includes('\n'));
  let oneLine = track(() => {
    switch (type) {
      case 'asyncfunction':
        return value.toString().replace('async', '');
      case 'generatorfunction':
        return value.toString().replace('function*', '').replace('*', '');
      case 'asyncgeneratorfunction':
        return value.toString().replace('async', '').replace('function*', '').replace('*', '');
    }

    return value.toString();
  });

  <Expandable
    {key}
    {type}
    {path}
    {value}
    length={isMultiLine.value ? 1 : 0}
    showLength={false}
    {...rest}
    valuePreview={component(&{ value, showPreview }) {
      console.log('FunctionView valuePreview', { value });
      if (previewLevel) {
        <span title={value.name} class="preview value function">{value.name}</span>
      } else if (showPreview && isMultiLine.value) {
        <FunctionBody value={oneLine.value} inline />
      } else if (!isMultiLine.value) {
        <FunctionBody value={oneLine.value} inline />
      }
    }}
  >
    if (isMultiLine) {
      <FunctionBody value={value.toString()} />
    }
    //
  </Expandable>
  <style>
    .preview.value.function {
      margin-left: 0.25em;
    }
  </style>
}
