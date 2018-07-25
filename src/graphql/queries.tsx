import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  ProductListRootQueryTypeArgs,
  PagedProducts,
  Product,
} from '../types/gql';
import { PRODUCT_FRAGMENT } from './fragments';

export const ALL_PRODUCTS = gql`
  query ProductList($page: Int) {
    productList(page: $page) {
      products {
        ...ProductFragment
      }
      pagination {
        totalPages
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export class AllProductsQuery extends Query<
  { productList?: PagedProducts },
  ProductListRootQueryTypeArgs
> {}

export const SINGLE_PRODUCT = gql`
  query SingleProduct($id: String) {
    product(id: $id) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export class SingleProductQuery extends Query<
  { product?: Product },
  { id: string }
> {}
