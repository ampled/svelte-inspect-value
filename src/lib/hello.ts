import { stringify } from './util.js'

export function logToConsole(...items: unknown[]) {
  console.log(
    '%cInspect',
    'background-color: black; padding: 5px; color: hotpink; border-radius: 8px;',
    ...items
  )
  // console.dirxml(...items);
}

export function copyToClipBoard(item: unknown) {
  const asdf = stringify(item, 0, 'double')
  return navigator.clipboard.writeText(asdf)
}
