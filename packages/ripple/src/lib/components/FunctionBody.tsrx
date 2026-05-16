import { collapseString, type TypeViewProps } from '@inspect/core';
import { track } from 'ripple';
import { ctx } from '../context.js';
import { highlightMarkup } from '../util/hljs.js';

type Props = TypeViewProps<string> & { inline?: boolean };

export component FunctionBody(&{ value, inline = false }: Props) {
  const ctxValue = ctx.get();
  let &[options] = track(() => ctxValue.options.value);

  function hljsHighlight(markup: string, stringCollape: number) {
    return highlightMarkup(collapseString(markup, stringCollape)).value;
  }

  let &[highlighted] = track(
    () => hljsHighlight(value.replaceAll('\t', ' '), options.stringCollapse),
  );

  <code data-testid="value" title={value} class={['value function hl', inline && 'inline']}>
    {html highlighted}
  </code>

  <style>
    code.value.function.hl.inline {
      display: inline;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :global code.value.function.hl {
      background-color: unset;
      padding-left: var(--_indent);
      color: var(--_text-color) !important;
      white-space: pre;

      .title.function_ {
        color: var(--_function-name-color);
      }

      .title.class_ {
        color: var(--_class-name-color);
      }

      .variable.language_ {
        color: var(--function-var-color, var(--base0E, purple));
      }

      .tag {
        color: var(--_text-color);
      }

      .keyword {
        color: var(--_error-color);
      }

      .name {
        color: var(--_error-color);
      }

      .attr {
        color: var(--function-attribute-color, var(--base0B, green));
      }

      .number {
        color: var(--_number-value-color);
      }

      .literal {
        color: var(--_boolean-value-color);
      }

      .comment {
        /** backwards compatibility to before prefixing with --function- */
        color: var(--function-comment-color, var(--comment-color, var(--base03)));
      }

      .string {
        color: var(--_string-value-color);
      }

      .params {
        color: var(--function-params-color, var(--base09, orange));
      }

      .property {
        color: var(--function-property-color, var(--base0B, lightgreen));
      }
    }
  </style>
}
