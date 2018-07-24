import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from '../../node_modules/redux';
import { reducer, State, Action } from './reducers';

export const store = createStore<State, Action, {}, {}>(
  reducer,
  {},
  composeWithDevTools(),
);
