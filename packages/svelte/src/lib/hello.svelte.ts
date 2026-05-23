/* eslint-disable no-console */
import { stringifyOrToString, type ValueType } from './util.js'

const style = 'background-color: #1e2c3e; padding: 5px; color: hotpink; border-radius: 8px;'

export function logToConsole(path: PropertyKey[] = [], value: unknown, type: string | undefined) {
  console.group('### Inspect ###')

  if (value && typeof value === 'object') {
    const propSymbols = Object.getOwnPropertySymbols(value)
    console.log(propSymbols)
  }

  try {
    // console.log(
    //   `%cInspect ${type} at ${path.join('.')}:`,
    //   style,
    //   '\n\n$state.snapshot:\n',
    //   $state.snapshot(value),
    //   '\n\nraw:\n',
    //   value
    // )
    console.log(`%cInspect ${type} at ${path.join('.')}:`, style)
    console.log('\n$state.snapshot:\n')
    console.log($state.snapshot(value))
    console.log('\nRaw:')
    console.log(value)
  } catch (e) {
    console.error(
      '[Inspect] Caught error trying to log snapshot of value. Retrying without cloning. Error:',
      e
    )
    console.log(
      `%cInspect ${type} at ${path.join('.')} without $state.snapshot:`,
      style,
      '\n',
      value
    )
  }
  console.groupEnd()
}

export function copyToClipBoard(item: unknown, type: ValueType) {
  if (type === 'bigint') {
    item = (item as bigint).toString() + 'n'
    return navigator.clipboard.writeText(item as string)
  }

  return navigator.clipboard.writeText(stringifyOrToString(item))
}
