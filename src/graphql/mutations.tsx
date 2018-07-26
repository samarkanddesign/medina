import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Session, LoginRootMutationTypeArgs } from '../types/gql';
import { PRODUCT_FRAGMENT } from './fragments';

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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID
    $name: String
    $description: String
    $price: Int
    $salePrice: Int
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      salePrice: $salePrice
    ) {
      product {
        ...ProductFragment
      }
      errors {
        key
        reason
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
