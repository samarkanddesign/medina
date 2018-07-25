import gql from 'graphql-tag';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    slug
    description
    price
    salePrice
    stockQty
    sku
    images {
      id
      url
    }
    thumbnail {
      url
    }
  }
`;
