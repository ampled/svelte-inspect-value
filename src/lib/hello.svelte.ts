import { type KeyType } from './types.js'
import { stringifyOrToString } from './util.js'

export function logToConsole(path: KeyType[] = [], value: unknown, type: string | undefined) {
  const prefix = [
    `%cInspect ${type} at ${path.join('.')}:`,
    'background-color: black; padding: 5px; color: hotpink; border-radius: 8px;',
  ]

  console.log(...prefix)

  let method: keyof typeof console = 'log'

  if (type === 'object') {
    method = 'dir'
  }

  try {
    console[method]($state.snapshot(value))
  } catch (e) {
    console.error(
      '[Inspect] caught error trying to log snapshot of value. retrying without cloning. error:',
      e
    )
    console.log('retry:', value)
  }
}

export function copyToClipBoard(item: unknown) {
  return navigator.clipboard.writeText(stringifyOrToString(item))
}
