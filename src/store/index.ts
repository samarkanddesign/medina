import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from '../../node_modules/redux';
import { reducer, State, Action } from './reducers';
import { Option } from 'catling';
import throttle = require('lodash/throttle');
import { filterAuthState } from '../lib/filterAuthState';

const retrieveState = () => {
  return Option(localStorage.getItem('state'))
    .map(JSON.parse)
    .map(filterAuthState)
    .getOrElse({});
};

export const store = createStore<State, Action, {}, {}>(
  reducer,
  retrieveState(),
  composeWithDevTools(),
);

store.subscribe(
  throttle(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
  }, 1000),
);
