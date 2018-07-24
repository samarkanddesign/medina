import * as React from 'react';
import { Option } from 'catling';
import { Product } from '../types/gql';
import Input from './Input';
import Vspace from './Vspace';
import TextArea from './TextArea';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

interface Props {
  product: Product;
}

const updateProduct = gql`
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
        id
        name
        description
        price
        salePrice
      }
      errors {
        key
        reason
      }
    }
  }
`;

interface ProductForm {
  id: string;
  name: string;
  description: string;
  price: string;
  salePrice: string;
}

export default function ProductForm({ product }: Props) {
  console.log(product);
  return (
    <Vspace>
      <Mutation mutation={updateProduct}>
        {updateProduct => (
          <Formik
            initialValues={desanitizeProductForm(product)}
            onSubmit={(values, { setSubmitting }) => {
              const stopSubmitting = () => setSubmitting(false);
              updateProduct({ variables: sanitizeProduct(values) })
                .then(stopSubmitting)
                .catch(stopSubmitting);
            }}
          >
            {props => (
              <form
                onSubmit={
                  props.isSubmitting
                    ? e => e.preventDefault()
                    : props.handleSubmit
                }
              >
                <Vspace>
                  <Input
                    label="Product Title"
                    name="name"
                    value={props.values.name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />

                  <TextArea
                    label="Description"
                    name="description"
                    value={props.values.description}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />

                  <Input
                    label="Price"
                    name="price"
                    type="number"
                    step="any"
                    value={props.values.price}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <button type="submit" disabled={props.isSubmitting}>
                    Submit
                  </button>
                </Vspace>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    </Vspace>
  );
}

function desanitizeProductForm({
  id,
  name,
  description,
  price,
  salePrice,
}: Product): ProductForm {
  return {
    id,
    name,
    description,
    price: (price / 100).toFixed(2),
    salePrice: Option(salePrice)
      .map(p => p / 100)
      .map(p => p.toFixed(2))
      .getOrElse(''),
  };
}

function sanitizeProduct({
  price,
  salePrice,
  ...values
}: ProductForm): Partial<Product> {
  return {
    ...values,
    price: parseFloat(price) * 100,
    salePrice: Option(salePrice)
      .filter(p => p.length > 0)
      .map(p => parseFloat(p) * 100)
      .getOrElse(undefined),
  };
}
