import type { KeyType } from './types.js'
import { stringifyOrToString } from './util.js'

export function logToConsole(path: KeyType[] = [], ...items: unknown[]) {
  console.log(
    `%cInspect ${path.join('.')}`,
    'background-color: black; padding: 5px; color: hotpink; border-radius: 8px;',
    '\n',
    ...items
  )
  // console.dirxml(...items);
}

export function copyToClipBoard(item: unknown) {
  const asdf = stringifyOrToString(item)
  return navigator.clipboard.writeText(asdf)
}
