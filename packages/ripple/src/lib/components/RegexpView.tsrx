import { type TypeViewProps } from '@inspect/core';
import { Expandable } from './Expandable.tsrx';
import { Node } from '../Node.tsrx';
import { PropertyList } from './PropertyList.tsrx';
import { GetterSetter } from './GetterSetter.tsrx';

const keys = [
  'lastIndex',
  'dotAll',
  'flags',
  'global',
  'hasIndices',
  'ignoreCase',
  'multiline',
  'source',
  'sticky',
  'unicode',
  'unicodeSets',
];

export component RegexpView(&{
  value,
  key = undefined,
  type,
  path,
  showKey,
  ...rest
}: TypeViewProps<RegExp>) {
  <Expandable
    length={1}
    showLength={false}
    {key}
    {path}
    {value}
    keepPreviewOnExpand
    valuePreview={component(&{ value }) {
      <span class="value regexp">{value.toString()}</span>
    }}
    {...rest}
  >
    <PropertyList
      {keys}
      {value}
      {type}
      item={component item(&{ key, descriptor, value }) {
        if (descriptor?.get || descriptor?.set) {
          <GetterSetter {value} {descriptor} {key} {path} />
        } else {
          <Node value={value?.[key]} {key} {path} />
        }
      }}
    />
  </Expandable>
}
