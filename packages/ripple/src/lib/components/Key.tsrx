import { getType, stringify, stringifyPath, type TypeViewProps } from '@inspect/core';
import { track } from 'ripple';
import { ctx } from '../context.js';
import { Node } from '../Node.tsrx';
import { Type } from './Type.tsrx';

type KeyProps = {
  prefix?: string;
  key: TypeViewProps<unknown>['key'] | unknown;
  path?: TypeViewProps<unknown>['path'];
  delim?: string;
  disabled?: boolean;
  allowUndefined?: boolean;
  previewLevel?: number;
} & JSX.IntrinsicElements['span'];

export component Key(&{
  key,
  path = [],
  delim = ':',
  prefix,
  disabled,
  onclick,
  previewLevel = 0,
  ...rest
}: KeyProps) {
  const ctxVal = ctx.get();
  const &[options] = track(() => ctxVal.options.value);

  const keyTypes = ['string', 'number', 'symbol', 'quotedstring'];
  const simpleKeys = ['bigint', 'regexp'];
  const shouldBeQuoted = /[^A-zÀ-ú0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F_$]|[\\[\]`]/;
  ctx.set({ ...ctxVal, isKey: true });

  let &[keyType] = track(() => {
    const t = getType(key);
    if (t === 'string') {
      if ((key as string).match(shouldBeQuoted) || key === '') {
        return 'quotedstring';
      }
      return t;
    }
    return t;
  });

  let &[display] = track(() => {
    if (key != null) {
      if (keyType === 'quotedstring') {
        // TODO: use options.quotes
        return stringify(key, undefined, options.quotes);
      }
      return key.toString();
    }
    return key;
  });

  let &[shouldShow] = track(() => key === undefined ? previewLevel > 0 : true);

  if (shouldShow) {
    <div class="key-and-delimiter">
      <div class={['key-outer', disabled && 'disabled']} title={stringifyPath(path)} {...rest}>
        if (prefix) {
          <span class="prefix">{prefix}</span>
        }
        if (keyTypes.includes(keyType)) {
          <span class={['key', keyType, disabled && 'disabled']}>
            if (keyType === 'quotedstring' && key !== '' && typeof display === 'string') {
              for (const char of display) {
                if (char === ' ') {
                  <span class="whitespace">{html '&sdot'}</span>
                } else {
                  {char}
                }
              }
            } else {
              {display?.toString()}
            }
          </span>
        } else if (simpleKeys.includes(keyType)) {
          <Node value={key} />
        } else {
          <Type type={keyType} force />
        }
      </div>
      if (delim) {
        <span class="delim">{delim}</span>
      }
    </div>
  }
  <style>
    .key-and-delimiter {
      display: flex;
    }

    .key-outer {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5em;
      margin: 0;
      padding: 0;

      &:focus:not(.disabled),
      &:hover:not(.disabled) {
        .key {
          text-decoration: underline;
          text-decoration-color: color-mix(in srgb, currentColor, transparent 50%);
        }
      }
    }

    .whitespace {
      opacity: var(--_key-whitespace-opacity);
      color: var(--_key-whitespace-color);
      user-select: none;
    }

    .key {
      display: flex;
      justify-content: center;
      align-items: center;
      transition:
        color var(--__transition-duration) ease-in-out,
        text-decoration-color var(--__transition-duration) ease-in-out;
      height: 100%;
      user-select: text;
      text-decoration: underline;
      text-decoration-color: transparent;

      &.number {
        color: var(--_number-value-color);
      }

      &.string {
        color: var(--_text-color);
      }

      &.symbol {
        color: var(--_symbol-value-color);
      }

      &.quotedstring {
        color: var(--_string-value-color);
        text-wrap: nowrap;
        white-space: pre !important;
        white-space-collapse: preserve-spaces;
      }
    }

    .delim {
      color: var(--_delimiter-color);
      user-select: text;
    }

    .prefix {
      color: var(--_key-prefix-color);
      font-weight: 900;
    }
  </style>
}
