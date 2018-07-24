import * as MockDate from 'mockdate';
import { State } from '../store/reducers';
import { filterAuthState } from './filterAuthState';

describe('filterAuthState', () => {
  it('filters an expired token from state', () => {
    MockDate.set(new Date('2018-08-21T21:16:28.000Z'));
    // expires at 2018-08-21T21:15:28.000Z
    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJiYXphYXIiLCJleHAiOjE1MzQ4ODgxNjgsImlhdCI6MTUzMjQ2ODk2OCwiaXNzIjoiYmF6YWFyIiwianRpIjoiNTUyYWRmYTUtYmE2Ny00ZDgxLWFjOTEtOWZiNGY3MWIyZTA5IiwibmJmIjoxNTMyNDY4OTY3LCJzdWIiOiIyIiwidHlwIjoiYWNjZXNzIn0.T4ccyXdyHpwZQ63F5CV731s8-9ZytYQbl70u9MVP5Z4AiuwuWsKPq01oIhW99sI_jw54XXIprLzNdaMjMluqCw';

    const state: State = { auth: { token } };

    expect(filterAuthState(state).auth.token).toBeUndefined();

    MockDate.reset();
  });

  it('leaves a non-expired token in state', () => {
    MockDate.set(new Date('2018-08-20T21:14:28.000Z'));
    // expires at 2018-08-21T21:15:28.000Z
    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJiYXphYXIiLCJleHAiOjE1MzQ4ODgxNjgsImlhdCI6MTUzMjQ2ODk2OCwiaXNzIjoiYmF6YWFyIiwianRpIjoiNTUyYWRmYTUtYmE2Ny00ZDgxLWFjOTEtOWZiNGY3MWIyZTA5IiwibmJmIjoxNTMyNDY4OTY3LCJzdWIiOiIyIiwidHlwIjoiYWNjZXNzIn0.T4ccyXdyHpwZQ63F5CV731s8-9ZytYQbl70u9MVP5Z4AiuwuWsKPq01oIhW99sI_jw54XXIprLzNdaMjMluqCw';

    const state: State = { auth: { token } };

    expect(filterAuthState(state).auth.token).toBe(token);

    MockDate.reset();
  });

  it('removes an invalid token from state', () => {
    const token = 'malformed';

    const state: State = { auth: { token } };

    expect(filterAuthState(state).auth.token).toBeUndefined();
  });
});
