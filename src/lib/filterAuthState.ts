import { Option, None } from 'catling';
import * as jwtDecode from 'jwt-decode';
import { isFuture, subDays } from 'date-fns';
import { T, F } from 'ramda';

import { State } from '../store/reducers';

export const filterAuthState = (state: State): State => {
  const token = checkToken(state.auth.token) ? state.auth.token : undefined;
  return { ...state, auth: { ...state.auth, token } };
};

const checkToken = (token: string | undefined): boolean => {
  return Option(token)
    .flatMap(t => {
      try {
        return Option(jwtDecode<{ exp: number }>(t));
      } catch {
        return None();
      }
    })
    .filter(({ exp }) => isFuture(subDays(exp * 1000, 1)))
    .fold<boolean>(F)(T);
};
