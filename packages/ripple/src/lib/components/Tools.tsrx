import { isPromise, stringifyPath, type TypeViewProps, wait } from '@inspect/core';
import { NodeButton } from './NodeButton.tsrx';
import { IconButton } from './IconButton.tsrx';
import { ctx, previewLevelCtx, debug } from '../context.js';
import { collapseStateCtx } from '../state.js';
import { logToConsole, copyToClipBoard } from '../util/tools.js';
import { track, tick, effect } from 'ripple';
import { ExpandCollapseIcon } from './icons/ExpandCollapseIcon.tsrx';
import icons from './icons';

type Props = Partial<TypeViewProps<unknown, string>> & { collapsed?: boolean };
type CollapseAction = {
  hint: string;
  action: (event: UIEvent) => void | Promise<void>;
  expand: boolean;
};

export component Tools(&{ value, type = '', path = [] }: Props) {
  const isDebug = debug.get();
  const ctxVal = ctx.get();
  const inspectState = collapseStateCtx.get();

  let &[copied] = track(false);
  let &[settingCollapse] = track<false | 'collapsing' | 'expanding'>(false);

  let &[stringifiedPath] = track(() => stringifyPath(path));
  let &[level] = track(() => path.length);
  let &[childNodes] = track(() => {
    JSON.stringify(currentState);
    return Object.entries(currentState).filter(
      ([k]) => k.startsWith(stringifiedPath) && k.split('.').length === level + 1,
    );
  });
  let &[currentState] = track<Record<string, boolean>>({});
  let &[collapsed] = track(() => currentState[stringifiedPath]);
  let &[hasExpandedChildren] = track(() => childNodes.some(([, state]) => !state));
  let &[hasChildren] = track(() => childNodes.length > 0);

  let &[showCopyButton] = track(() => {
    if (onCopy) {
      if (canCopy) return canCopy(value, type!, path);
      return true;
    }

    return [
      'array',
      'object',
      'number',
      'bigint',
      'string',
      'undefined',
      'null',
      'date',
      'boolean',
    ].includes(type ?? '');
  });

  effect(() => {
    const unsub = inspectState.subscribe((state) => {
      console.log('set currentState');
      currentState = state;
    });
    return unsub;
  });

  let &[{ onCopy, canCopy, onLog, showTools }] = track(() => ctxVal.options.value);

  let copyTimeout: number;
  function onCopySuccess() {
    copied = true;
    if (copyTimeout) window.clearTimeout(copyTimeout);
    copyTimeout = window.setTimeout(() => {
      copied = false;
    }, 5000);
  }

  async function runCustomCopy() {
    let ret: ReturnType<NonNullable<typeof onCopy>>;
    try {
      ret = onCopy!((value), type!, path);
      if (isPromise(ret)) {
        const wasCopied = await ret;
        if (wasCopied) onCopySuccess();
      } else if (typeof ret === 'boolean') {
        if (ret) onCopySuccess();
      }
    } catch (e) {
      console.error('[Inspect] error running custom onCopy callback:', e);
      copied = false;
    }
  }

  async function copy(e: UIEvent) {
    e.stopPropagation();
    if (onCopy) {
      runCustomCopy();
    } else {
      try {
        await copyToClipBoard(value, type);
        onCopySuccess();
      } catch (e) {
        console.error(e);
        copied = false;
      }
    }
  }

  function log(e: UIEvent) {
    e.stopPropagation();
    if (onLog) {
      onLog(value, type!, path);
    } else {
      logToConsole(path, value, type);
    }
  }

  const collapseAction: CollapseAction = {
    hint: 'Collapse children',
    action: async (e) => {
      e.stopPropagation();
      settingCollapse = 'collapsing';
      for (const [path, state] of childNodes.toReversed()) {
        if (!state) {
          inspectState.setCollapse(path, true);
          await wait();
        }
      }
      settingCollapse = false;
      await tick();
      // currentState = inspectState.getValue();
    },
    expand: false,
  };

  const expandAction: CollapseAction = {
    hint: 'Expand children',
    action: async (e) => {
      e.stopPropagation();
      settingCollapse = 'expanding';
      for (const [path, state] of childNodes) {
        if (state) {
          inspectState.setCollapse(path, false);
          await wait();
        }
      }
      settingCollapse = false;
      await tick();
      // currentState = inspectState.getValue();
    },
    expand: true,
  };

  const expandSelfAndChildrenAction: CollapseAction = {
    hint: 'Expand node and children',
    action: async (e) => {
      e.stopPropagation();
      inspectState.setCollapse(stringifiedPath, false);
      expandAction.action(e);
      await tick();
      // currentState = inspectState.getValue();
    },
    expand: true,
  };

  const expandSelf: CollapseAction = {
    hint: 'Expand node',
    action: async (e) => {
      e.stopPropagation();
      inspectState.setCollapse(stringifiedPath, false);
      await tick();
    },
    expand: true,
  };

  const collapseSelf: CollapseAction = {
    hint: 'Collapse node',
    action: async (e) => {
      e.stopPropagation();
      inspectState.setCollapse(stringifiedPath, true);
      await tick();
    },
    expand: false,
  };

  function getTreeAction(collapsed: boolean) {
    if (typeof collapsed === 'boolean') {
      if (collapsed) {
        return expandSelfAndChildrenAction;
      }

      if (hasChildren) {
        return hasExpandedChildren ? collapseAction : expandAction;
      }
    }

    return undefined;
  }

  let &[treeAction] = track(() => {
    JSON.stringify(currentState);
    if (typeof collapsed === 'boolean') {
      if (collapsed) {
        return expandSelfAndChildrenAction;
      }

      if (hasChildren) {
        return hasExpandedChildren ? collapseAction : expandAction;
      }
    }

    return undefined;
  });

  // effect(() => {
  //   console.log(JSON.stringify(inspectState.value, undefined, 2));
  // });

  if (showTools) {
    <div class="tools">
      if (isDebug) {
        <NodeButton
          onClick={(e) => {
            e.stopPropagation();
            console.log(
              {
                collapsed,
                stringifiedPath,
                treeAction,
                hasChildren,
                level,
                childNodes,
                state: inspectState.valueAsJson,
              },
            );
          }}
        >
          {'?'}
        </NodeButton>
      }
      if (treeAction && treeAction.hint) {
        <IconButton
          disabled={settingCollapse !== false}
          title={treeAction?.hint}
          aria-label={treeAction?.hint}
          onclick={treeAction?.action}
        >
          <icons.ExpandCollapseIcon expand={treeAction?.expand} setting={settingCollapse} />
        </IconButton>
      }
      <IconButton title="Log value to console" aria-label="Log value to console" onclick={log}>
        <icons.ConsoleIcon />
      </IconButton>
      if (showCopyButton) {
        <IconButton
          title="Copy value to clipboard"
          aria-label="Copy value to clipboard"
          onclick={copy}
          success={copied}
        >
          <icons.ClipboardIcon {copied} />
        </IconButton>
      }
    </div>
  }
  <style>
    .tools {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 0.25em;
      opacity: 0;
      z-index: calc(var(--index) + 1);
      backdrop-filter: blur(1px);
      transition: opacity var(--__transition-duration) ease-in-out allow-discrete;
      border-left: 1px solid var(--_tools-border-color);
      background-color: var(--_tools-background-color);
      padding-inline: 0.5em;
      max-height: 1.5em;
      overflow: clip;
      font-size: 1em;
    }

    :global(.line:hover) .tools,
    :global(.line:focus-within) .tools {
      display: flex;
      opacity: 1;
      transition: opacity var(--__transition-duration) ease-in-out allow-discrete;
    }
  </style>
}
