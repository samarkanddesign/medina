import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import axios from 'axios';

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
      images {
        url
      }
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
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return <span>loading...</span>;
          }

          if (error) {
            return <pre>{JSON.stringify(error, null, ' ')}</pre>;
          }
          if (data && data.product) {
            return (
              <>
                {(data.product as any).images.map((i: any) => (
                  <img src={i.url} style={{ height: '50px', width: 'auto' }} />
                ))}
                <ProductForm product={data.product} />
                <ProductImageForm
                  productId={id}
                  refetch={() => refetch({ id })}
                />
              </>
            );
          }

          return '😭';
        }}
      </SingleProductQuery>
    </section>
  );
}

interface ProductImageFormProps {
  productId: string;
  refetch: () => void;
}

class ProductImageForm extends React.Component<ProductImageFormProps, {}> {
  handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.uploadInput !== null && this.uploadInput.files) {
      const data = new FormData();
      data.append('product_id', this.props.productId);
      data.append('image', this.uploadInput.files[0]);

      axios
        .post('http://localhost:4000/api/product_images', data)
        .then(r => {
          this.props.refetch();

          console.log();
        })
        .catch(console.log);
    }
  };

  uploadInput: HTMLInputElement | null = null;

  render() {
    return (
      <form onSubmit={this.handleUpload}>
        <input type="file" ref={el => (this.uploadInput = el)} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}
