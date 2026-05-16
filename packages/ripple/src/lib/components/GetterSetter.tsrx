import {
  type TypeViewProps,
  descriptorPrefix,
  stringifyPath,
  InspectError,
  nodeActionKeydown,
} from '@inspect/core';
import { track, tick, effect, bindValue } from 'ripple';
import { Expandable } from './Expandable.tsrx';
import { ctx, previewLevelCtx, valueCacheCtx } from '../context.js';
import { NodeButton } from './NodeButton.tsrx';
import { Node } from '../Node.tsrx';
import { Input } from './Input.tsrx';
import { InspectErrorView } from './InspectErrorView.tsrx';
import { Preview } from './Preview.tsrx';

type Props = TypeViewProps<unknown, 'get'> & {
  descriptor: PropertyDescriptor;
  usedefaults?: boolean;
} & JSX.IntrinsicElements['div'];

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
  let ctxVal = ctx.get();
  let valueCache = valueCacheCtx.get();
  let &[options] = track(() => ctxVal.options.value);
  let _previewLevel = previewLevelCtx.get();
  let &[previewLevel] = track(() => typeof _previewLevel === 'number' ? _previewLevel : 0);

  let &[valueRetrieved, $valueRetrieved] = track(false);
  let &[getterValue] = track<unknown>();
  let &[error] = track<InspectError>();
  let &[isSetting, $isSetting] = track(false);
  let &[inputText, $inputText] = track('');
  let &[inputState] = track<'valid' | 'invalid' | 'untouched'>('untouched');
  let &[inputValue, $inputValue] = track<unknown>();
  let &[path] = track(() => key != null && prevPath ? [...prevPath, key] : ['root']);
  let &[keyPrefix] = track(() => `${_keyPrefix ?? ''} ${descriptorPrefix(descriptor)}`);
  let inputElement: HTMLInputElement | undefined;
  let setButton: HTMLButtonElement;

  let &[stringifiedPath] = track(() => stringifyPath(path));
  let &[hasCachedValue, $hasCachedValue] = track(() => valueCache.has(stringifiedPath));
  let &[retrievedValue, $retrievedValue] = track(
    () => valueRetrieved
      ? getterValue
      : hasCachedValue
        ? valueCache.get(stringifiedPath)
        : undefined,
  );

  function callGetter(e: UIEvent) {
    e.stopPropagation();
    try {
      valueRetrieved = true;
      const newGetterValue = descriptor.get?.call(value);
      getterValue = newGetterValue;
      valueCache.set(stringifiedPath, getterValue);
    } catch (e) {
      valueCache.delete(stringifiedPath);
      error = new InspectError('getter call failed', descriptor.get, { cause: e });
      valueRetrieved = false;
    }
  }

  function callSetter(e: UIEvent) {
    e.stopPropagation();
    if (inputState === 'valid') {
      try {
        descriptor.set?.call(value, inputValue);
        // stateContext.setGetterValue(path, inputValue)
      } catch (e) {
        error = new InspectError('setter call failed', descriptor.set, { cause: e });
        // stateContext.setGetterValue(path, undefined)
      } finally {
        isSetting = false;
        inputText = '';
        inputValue = undefined;
        inputState = 'untouched';
      }
    } else {
      inputState = 'invalid';
    }
  }

  function reset(e: UIEvent) {
    e.stopPropagation();
    error = undefined;
    getterValue = undefined;
    valueRetrieved = false;
    valueCache.delete(stringifiedPath);
  }

  function onKeyUp(event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    const value = event.currentTarget.value;
    if (value.length) {
      try {
        inputValue = JSON.parse(value);
        inputState = 'valid';
      } catch {
        inputState = 'invalid';
      }
    } else {
      inputState = 'untouched';
    }
  }

  async function onKeyDown(event: KeyboardEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  }) {
    event.stopPropagation();
    if (event.key === 'Escape') {
      isSetting = false;
      inputText = '';
      inputState = 'untouched';
      await tick();
      setButton?.focus();
      return;
    }
    if (event.key === 'Enter') {
      callSetter(event);
    }
  }

  async function showInput(e: UIEvent) {
    e.stopPropagation();
    isSetting = true;
    await tick();
    inputElement?.focus();
  }

  async function hideInput(e: UIEvent) {
    e.stopPropagation();
    isSetting = false;
    inputText = '';
    inputState = 'untouched';
    await tick();
    setButton?.focus();
  }

  effect(() => {
    if (isSetting) {
      console.log('setter inputValue:', inputText);
    }
  });

  component valuePreview(&{
    showPreview,
    value,
  }: {
    showPreview: boolean;
    value?: PropertyDescriptor;
  }) {
    if ($isSetting.value) {
      <Input
        {ref bindValue($inputText)}
        {ref (node: HTMLInputElement) => {
          inputElement = node;
          return () => {
            inputElement = undefined;
          };
        }}
        type="text"
        class={inputState}
        placeholder="json"
        style="max-width: 30ch"
        containerAttrs={{ style: 'max-width: 30ch;' }}
        onClick={(e) => e.stopPropagation()}
        {onKeyUp}
        {onKeyDown}
      />
      <NodeButton
        title={`set ${key?.toString()}`}
        onClick={callSetter}
        onKeyDown={nodeActionKeydown(callSetter)}
        style="padding-right: 0.5em"
      >
        {'set'}
      </NodeButton>
      <NodeButton title="cancel" onClick={hideInput} onKeyDown={nodeActionKeydown(hideInput)}>
        {'x'}
      </NodeButton>
    } else if (value.set && previewLevel === 0) {
      <NodeButton
        {ref (node: HTMLButtonElement) => {
          setButton = node;
          return () => (setButton = undefined);
        }}
        title={`set ${key?.toString()}`}
        onClick={showInput}
        onKeyDown={nodeActionKeydown(showInput)}
      >
        {'set'}
      </NodeButton>
    }
    if (value.get) {
      if (previewLevel === 0) {
        <NodeButton
          title={`get ${key?.toString()}`}
          onClick={callGetter}
          onKeyDown={nodeActionKeydown(callGetter)}
        >
          {'get'}
        </NodeButton>
      }
      <Preview
        {usedefaults}
        showPreview={($hasCachedValue.value || $valueRetrieved.value) && showPreview}
        singleValue={{ value: $retrievedValue.value }}
        style={previewLevel > 0 ? 'margin-left: -0.5em' : ''}
        bracketStyle="color: var(--_comment-color)"
        showKey={false}
        startLevel={0}
        prefix="("
        postfix=")"
        keyDelim=""
        {path}
      />
    }
  }

  if (error) {
    <InspectErrorView value={error} {reset} {keyPrefix} {key} {path} />
    return;
  }
  <Expandable
    {key}
    {keyPrefix}
    {path}
    keyDelim={previewLevel > 0 ? '' : ':'}
    value={descriptor}
    showLength={false}
    length={1}
    keepPreviewOnExpand
    previewProps={{ inputElement }}
    {valuePreview}
    {...rest}
  >
    if (descriptor.get) {
      if (valueRetrieved) {
        <Node key="value" value={retrievedValue} {path} {usedefaults} />
      }
      <Node key="getter" value={descriptor.get} {path} {usedefaults} />
    }
    if (descriptor.set) {
      <Node key="setter" value={descriptor.set} {path} {usedefaults} />
    }
  </Expandable>
}
