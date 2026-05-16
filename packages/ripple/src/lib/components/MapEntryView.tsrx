import type { TypeViewProps } from '@inspect/core';
import { Expandable } from './Expandable.tsrx';
import { Preview } from './Preview.tsrx';
import { Node } from '../Node.tsrx';

type MapEntry = [unknown, unknown];

type Props = TypeViewProps<MapEntry>;

export component MapEntryView(&{ value, key = undefined, type, path, ...rest }: Props) {
  <Expandable
    {key}
    type=""
    {value}
    {path}
    length={2}
    showLength={false}
    keepPreviewOnExpand
    {...rest}
    valuePreview={component(&{ showPreview, value }) {
      <Preview
        keyValue={[[value[0] as PropertyKey, value[1]]]}
        prefix="{"
        postfix="}"
        keyDelim="=>"
        keyStyle="margin-right: 0.5em"
        {showPreview}
      />
    }}
  >
    <Node key="key" value={value[0]} {path} />
    <Node key="value" value={value[1]} {path} />
  </Expandable>
}
