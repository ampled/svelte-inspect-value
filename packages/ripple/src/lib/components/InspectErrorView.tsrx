import { InspectError, type TypeViewProps } from '@inspect/core';
import { Expandable } from './Expandable.tsrx';
import { PropertyList } from './PropertyList.tsrx';
import { StringValue } from './StringValue.tsrx';
import { NodeButton } from './NodeButton.tsrx';

type Props = TypeViewProps<InspectError, 'InspectError'> & { reset?: (event: UIEvent) => void };

export component InspectErrorView(&{
  value = new InspectError(''),
  key,
  type = 'InspectError',
  path,
  keyPrefix,
  reset,
}: Props) {
  <Expandable
    {value}
    {key}
    {keyPrefix}
    {path}
    {type}
    length={4}
    showLength={false}
    keepPreviewOnExpand
    valuePreview={component({ value }) {
      <NodeButton onClick={reset}>{'RESET'}</NodeButton>
      <StringValue value={(value as InspectError).message} type="error" />
    }}
  >
    <PropertyList {path} {type} {value} keys={['message', 'value', 'cause', 'stack']} />
  </Expandable>
}
