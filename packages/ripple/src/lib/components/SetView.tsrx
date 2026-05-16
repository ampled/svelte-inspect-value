import type { TypeViewProps } from '@inspect/core';
import { track } from 'ripple';
import { Expandable } from './Expandable.tsrx';
import { Preview } from './Preview.tsrx';
import { PropertyList } from './PropertyList.tsrx';
import { Node } from '../Node.tsrx';

type Props = TypeViewProps<Set<unknown>>;

export component SetView(&{ value, key, type, path, ...rest }: Props) {
  let &[entries, $entries] = track(() => [...value.values()]);
  let &[keys] = track(() => [...entries.keys()]);
  let childProps = track(
    () => ({
      path,
    }),
  );

  <Expandable
    {value}
    {key}
    {type}
    {path}
    length={entries.length}
    {...rest}
    valuePreview={component(&{ showPreview }) {
      <Preview list={$entries.value} prefix="{" postfix="}" showKey={false} {showPreview} />
    }}
  >
    <PropertyList
      {value}
      {keys}
      item={component(&{ key, index }) {
        <Node key={index} value={$entries.value[key]} {...childProps.value} />
      }}
    />
  </Expandable>
}
