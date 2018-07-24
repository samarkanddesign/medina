interface SetToken {
  type: 'SetToken';
  token: string;
}

export function SetToken(token: string): SetToken {
  return {
    type: 'SetToken',
    token,
  };
}

export interface AuthState {
  token?: string;
}

export type AuthAction = SetToken;

export const authReducer = (
  state: AuthState = { token: undefined },
  action: AuthAction,
) => {
  switch (action.type) {
    case 'SetToken': {
      return { ...state, token: action.token };
    }

    default: {
      return state;
    }
  }
};
