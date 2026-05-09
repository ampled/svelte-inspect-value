import { type TypeViewProps, descriptorPrefix } from '@inspect/core'
import { track, tick } from 'ripple'
import { Expandable } from './Expandable.tsrx'

type Props = TypeViewProps<unknown, 'get'> & {
  descriptor: PropertyDescriptor;
  usedefaults?: boolean;
} & JSX.IntrinsicElements['div']

export component GetterSetter(&{
  value,
  display,
  key,
  path: prevPath = [],
  descriptor,
  children,
  keyPrefix: _keyPrefix,
  usedefaults,
  ...rest
}: Props) {
  let &[path] = track(() => key != null && prevPath ? [...prevPath, key] : ['root'])
  let &[keyPrefix] = track(() => `${_keyPrefix ?? ''} ${descriptorPrefix(descriptor)}`)

  <Expandable {value} {key} {keyPrefix} {path} valuePreview={component() {}} />
}
