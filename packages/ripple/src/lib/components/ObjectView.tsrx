import { enumerateObject, type TypeViewProps, type ValueType } from '@inspect/core';
import { Expandable } from './Expandable.tsrx';
import { Node } from '../Node.tsrx';
import { Preview } from './Preview.tsrx';
import { PropertyList } from './PropertyList.tsrx';
import { track } from 'ripple';
import { GetterSetter } from './GetterSetter.tsrx';

export component ObjectView(&{ value, key, type, path, ...rest }: TypeViewProps<object>) {
  let &[namedConstructor] = track(
    () => value?.constructor?.name !== 'Object' ? value?.constructor?.name : false,
  );
  let &[objectType] = track(() => namedConstructor ? namedConstructor as ValueType : type);
  let &[properties] = track(() => enumerateObject(value) as (symbol | string)[]);
  let &[keys] = track(
    () => [...properties, namedConstructor ? 'constructor' : undefined].filter((v) => v != null),
  );
  let childProps = track(() => ({ path, keys }));

  <Expandable
    type={objectType}
    length={keys.length}
    {key}
    {path}
    {value}
    forceType={!!namedConstructor}
    valuePreview={component(&{ showPreview, value }) {
      <Preview prefix="{" postfix="}" {value} {showPreview} {...childProps.value} />
    }}
    {...rest}
  >
    <PropertyList {keys} {value} {type} {path} />
  </Expandable>
}
