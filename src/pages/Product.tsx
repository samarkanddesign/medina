import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Product } from 'src/types/gql';
import ProductForm from 'src/components/ProductForm';

interface Props extends RouteComponentProps<{ id: string }> {}

const SingleProduct = gql`
  query SingleProduct($id: String) {
    product(id: $id) {
      name
      slug
      description
      price
      salePrice
      stockQty
    }
  }
`;

class SingleProductQuery extends Query<{ product?: Product }, { id: string }> {}

export default function Product({ match }: Props) {
  const id = match.params.id;
  return (
    <section>
      <h1>Products</h1>

      <SingleProductQuery query={SingleProduct} variables={{ id }}>
        {({ data, loading, error, client }) => {
          if (loading) {
            return <span>loading...</span>;
          }

          if (error) {
            return <pre>{JSON.stringify(error, null, ' ')}</pre>;
          }
          if (data && data.product) {
            return <ProductForm product={data.product} />;
          }

          return '😭';
        }}
      </SingleProductQuery>
    </section>
  );
}
