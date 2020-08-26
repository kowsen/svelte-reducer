import { Readable, writable } from 'svelte/store';
import { Action, On, reducer as pureReducer } from 'ts-action';

export interface SvelteReducer<S = {}> extends Readable<S> {
  reduce(action: Action): void;
}

export function reducer<S>(initialState: S, ...ons: On<S>[]): SvelteReducer<S> {
  const stateBase = writable(initialState);
  const reducer = pureReducer(initialState, ...ons);

  return {
  	reduce: (action: Action) => {
  		stateBase.update(state => reducer(state, action)),
  	},
  	subscribe: stateBase.subscribe,
  };
}