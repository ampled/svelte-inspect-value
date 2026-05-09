import { type ValueType } from '@inspect/core'
import { track } from 'ripple'

export default component(&{ length, type }: { length: number; type: ValueType }) {
  let &[prefix] = track(() => {
    switch (type) {
      case 'urlsearchparams':
        return 'size:'
      default:
        return ''
    }
  })

  let &[unit] = track(() => {
    switch (type) {
      case undefined:
        return
      case 'urlsearchparams':
        return
      case 'array':
      case 'int8array':
      case 'uint8array':
      case 'uint8clampedarray':
      case 'int16array':
      case 'uint16array':
      case 'int32array':
      case 'uint32array':
      case 'float32array':
      case 'float64array':
      case 'bigint64array':
      case 'biguint64array':
        return 'items'
      case 'string':
        return 'chars'
      default:
        return 'entries'
    }
  })

  if (typeof length === 'number') {
    <div class="count">
      if (length > 0) {
        if (prefix) {
          <span class="unit">{prefix}</span>
        }
        <span>
          {length}
        </span>
        if (unit) {
          <span class="unit">{unit}</span>
        }
      } else {
        <span>{'empty'}</span>
      }
    </div>
  }

  <style>
    .count {
      display: flex;
      gap: 0.5ch;
      transition: color var(--__transition-duration) ease-in-out;
      margin-right: 1ch;
      color: var(--_length-color);
      font-style: italic;
      font-weight: bold;
      font-size: 0.857em;
    }

    :global(.count .unit) {
      display: var(--unit-display);
    }
  </style>
}
