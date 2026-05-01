import type { TypeViewProps } from '@inspect/core';
import { OneLineView } from './OneLineView.tsrx';
import { StringView } from './StringView.tsrx';
import { type Component, type PropsWithChildrenOptional } from 'ripple';

export type ViewComponent<T> = Component<PropsWithChildrenOptional<TypeViewProps<T>>>;

export type ComponentEntry<T = unknown> = [ViewComponent<T>, (props: TypeViewProps<T>) => Partial<TypeViewProps<T>>] | [ViewComponent<T>];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ViewComponents = Record<string, ComponentEntry<any>>;

const components = {
	number: [OneLineView],
	boolean: [OneLineView],
	undefined: [OneLineView],
	null: [OneLineView],
	string: [StringView],
} as ViewComponents;

export function getComponent(type: string): ComponentEntry<any> | undefined {
	if (type in components) {
		return components[type];
	}
}
