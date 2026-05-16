import {
  getType,
  stringifyPath,
  type TypeViewProps,
  type ValueType,
  InspectError,
} from '@inspect/core';
import { effect, track } from 'ripple';
import { getComponent, type ViewComponent } from './components/type-view-components.tsrx';
import { Default } from './components/Default.tsrx';
import { InspectErrorView } from './components/InspectErrorView.tsrx';

export component Node(&{
  value = undefined,
  key,
  keyDelim = ':',
  path: prevPath = [],
  usedefaults,
  forceView,
  ...rest
}: TypeViewProps & { usedefaults?: boolean; forceView?: string }) {
  let &[type] = track(() => forceView ? forceView : getType(value));

  effect(() => {
    // console.log('### NODE props:', { value, key, ...rest });
  });

  function getTypeComponent(value: unknown, type: ValueType) {
    let entry = getComponent(type);

    if (entry) {
      return entry[0];
    }
    return Default;
  }

  let &[_, TrackedTypeComponent] = track(() => getTypeComponent(value, type));
  let &[path] = track(() => key != null && prevPath ? [...prevPath, key] : ['root']);
  let &[stringifiedPath] = track(() => stringifyPath(path));

  try {
    <@TrackedTypeComponent {value} {key} {path} {type} {keyDelim} {...rest} />
  } catch (e) {
    const err = new InspectError(`Component for value of type ${type} failed`, value, {
      cause: e,
    });
    <InspectErrorView value={err} {key} {path} />
  }
}
