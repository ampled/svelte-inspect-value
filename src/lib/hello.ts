import type { KeyType } from './types.js'
import { stringifyOrToString } from './util.js'

export function logToConsole(path: KeyType[] = [], value: unknown, type: string | undefined) {
  const prefix = [
    `%cInspect ${path.join('.')}`,
    'background-color: black; padding: 5px; color: hotpink; border-radius: 8px;',
  ]

  if (type === 'object') {
    console.log(...prefix)
    console.dir(value)
  } else {
    console.log(...prefix, '\n', value)
  }
  // console.dirxml(...items);
}

export function copyToClipBoard(item: unknown) {
  const asdf = stringifyOrToString(item)
  return navigator.clipboard.writeText(asdf)
}
