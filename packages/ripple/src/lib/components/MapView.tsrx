import type { TypeViewProps } from '@inspect/core';
import { track } from 'ripple';
import { Expandable } from './Expandable.tsrx';
import { Preview } from './Preview.tsrx';
import { PropertyList } from './PropertyList.tsrx';
import { Node } from '../Node.tsrx';

type Props = TypeViewProps<Map<unknown, unknown>>;

export component MapView(&{ value, key, type, path, ...rest }: Props) {
  console.log('MapView value constructor name:', value.constructor.name);

  let &[keys] = track(() => [...value.keys()] as PropertyKey[]);
  let &[entries, $entries] = track<[PropertyKey, unknown][]>(
    () => [...value.entries()] as [PropertyKey, unknown][],
  );
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
      <Preview
        keyValue={$entries.value}
        prefix="{"
        postfix="}"
        keyDelim="=>"
        keyStyle="margin-right: 0.5em"
        {showPreview}
      />
    }}
  >
    <PropertyList
      {value}
      {keys}
      item={component(&{ key, index }) {
        <Node
          forceView="mapentry"
          key={index}
          value={[key, value.get(key)]}
          {...childProps.value}
        />
      }}
    />
  </Expandable>
}
