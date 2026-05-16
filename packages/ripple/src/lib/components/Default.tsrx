import { type TypeViewProps, getAllProperties } from '@inspect/core';
import { track } from 'ripple';
import { OneLineView } from './OneLineView.tsrx';
import { Expandable } from './Expandable.tsrx';
import { Preview } from './Preview.tsrx';
import { PropertyList } from './PropertyList.tsrx';

export component Default(&{ value, key, path, ...rest }: TypeViewProps) {
  let &[keys] = track(() => getAllProperties(value));

  if (keys.length) {
    <Expandable
      {key}
      {path}
      {value}
      length={keys.length}
      valuePreview={component(&{ showPreview, value }) {
        <Preview prefix="{" postfix="}" {value} {keys} {path} {showPreview} />
      }}
      {...rest}
    >
      <PropertyList {keys} {value} />
    </Expandable>
  } else {
    <OneLineView {key} {path} {value} {...rest} />
  }
}
