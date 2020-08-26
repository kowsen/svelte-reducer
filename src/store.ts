import type { Action } from 'ts-action';

import type { SvelteReducer } from './reducer';

export class Store {
  reducers: SvelteReducer[] = [];

  addReducer(reducer: SvelteReducer) {
    this.reducers.push(reducer);
  }

  dispatch(action: Action) {
    for (const reducer of this.reducers) {
      reducer.reduce(action);
    }
  }
}
