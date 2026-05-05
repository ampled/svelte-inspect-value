import {
	ExtractState,
	StoreApi,
	StoreMutatorIdentifier,
	StateCreator,
	Mutate,
} from 'zustand/vanilla';
import { createStore } from 'zustand/vanilla';
import type { Tracked } from 'ripple';
import { effect, track } from 'ripple';

type ReadonlyStoreApi<T> = Pick<StoreApi<T>, 'getState' | 'getInitialState' | 'subscribe'>;

const identity = <T>(arg: T): T => arg;

export function useStore<S extends ReadonlyStoreApi<unknown>>(api: S): ExtractState<S>;

export function useStore<S extends ReadonlyStoreApi<unknown>, U>(
	api: S,
	selector: (state: ExtractState<S>) => U
): U;

export function useStore<TState, StateSlice>(
	api: ReadonlyStoreApi<TState>,
	selector: (state: TState) => StateSlice = identity as any
) {
	const initialValue = selector(api.getState());

	if (typeof initialValue === 'function') {
		return initialValue;
	}

	const slice = track(initialValue);

	effect(() => {
		const unsub = api.subscribe((state) => {
			slice.value = selector(state);
		});

		return () => unsub();
	});

	return slice;
}

type IsFunction<T> = T extends (...args: any[]) => any ? T : never;
type UseBoundStore<S extends ReadonlyStoreApi<unknown>> = {
	(): ExtractState<S> extends IsFunction<ExtractState<S>>
		? ExtractState<S>
		: Tracked<ExtractState<S>>;
	<U>(selector: (state: ExtractState<S>) => U): U extends IsFunction<U> ? U : Tracked<U>;
} & S;

type Create = {
	<T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
		initializer: StateCreator<T, [], Mos>
	): UseBoundStore<Mutate<StoreApi<T>, Mos>>;
	<T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
		initializer: StateCreator<T, [], Mos>
	) => UseBoundStore<Mutate<StoreApi<T>, Mos>>;
};

const createImpl = <T>(createState: StateCreator<T, [], []>) => {
	const api = createStore(createState);

	const useBoundStore: any = (selector: any) => useStore(api, selector);

	Object.assign(useBoundStore, api);

	return useBoundStore;
};

export const create = (<T>(createState: StateCreator<T, [], []> | undefined) =>
	createState ? createImpl(createState) : createImpl) as Create;
