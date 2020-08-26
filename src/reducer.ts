import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Action, On } from 'ts-action';
import { reducer as baseReducer } from 'ts-action';

export interface SvelteReducer<S = {}> extends Readable<S> {
  reduce(action: Action): void;
}

export function reducer<S>(initialState: S, ...ons: On<S>[]): SvelteReducer<S> {
  const stateBase = writable(initialState);
  const pureReducer = baseReducer(initialState, ...ons);

  return {
    reduce: (action: Action) => {
      stateBase.update((state) => pureReducer(state, action));
    },
    subscribe: stateBase.subscribe,
  };
}
