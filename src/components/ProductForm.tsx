import * as React from 'react';
import { Product } from '../types/gql';

interface Props {
  product: Product;
}

export default function ProductForm({ product }: Props) {
  return (
    <form>
      <label>
        Product Title
        <input type="text" value={product.name} />
      </label>

      <label>
        <textarea>{product.description}</textarea>
      </label>
    </form>
  );
}
