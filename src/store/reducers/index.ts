import { combineReducers } from 'redux';
import { authReducer, AuthAction, AuthState } from './auth';

export type Action = AuthAction;
export interface State {
  auth: AuthState;
}

export const reducer = combineReducers({
  auth: authReducer,
});
