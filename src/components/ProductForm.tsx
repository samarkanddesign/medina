import * as React from 'react';
import { Product } from '../types/gql';
import Input from 'src/components/Input';
import Vspace from 'src/components/Vspace';
import TextArea from 'src/components/TextArea';

interface Props {
  product: Product;
}

export default function ProductForm({ product }: Props) {
  return (
    <form>
      <Vspace>
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
      </Vspace>
    </form>
  );
}
