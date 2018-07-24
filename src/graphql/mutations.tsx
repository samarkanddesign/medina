import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Session, LoginRootMutationTypeArgs } from '../types/gql';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      user {
        id
        name
        email
      }
    }
  }
`;

export class LoginMutation extends Mutation<
  { login: Session },
  LoginRootMutationTypeArgs
> {}
