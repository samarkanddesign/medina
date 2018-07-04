import * as React from 'react';
import { Product } from '../types/gql';
import Input from 'src/components/Input';
import Vspace from 'src/components/Vspace';
import TextArea from 'src/components/TextArea';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

interface Props {
  product: Product;
}

const updateProduct = gql`
  mutation UpdateProduct($id: ID, $name: String, $description: String) {
    updateProduct(id: $id, name: $name, description: $description) {
      product {
        name
        id
      }
      errors {
        key
        reason
      }
    }
  }
`;

export default function ProductForm({ product }: Props) {
  let name: HTMLInputElement | null;
  console.log(product);
  return (
    <Vspace>
      <Mutation mutation={updateProduct}>
        {updateProduct => (
          <form
            onSubmit={e => {
              e.preventDefault();
              updateProduct({
                variables: { id: product.id, name: name && name.value },
              });
            }}
          >
            <input type="text" ref={i => (name = i)} />
            <Input
              label="Product Title"
              value={product.name}
              onChange={() => null}
            />

            <TextArea
              label="Description"
              value={product.description}
              onChange={() => null}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Mutation>
    </Vspace>
  );
}
