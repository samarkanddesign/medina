import * as React from 'react';
import { Option } from 'catling';
import { Product } from '../types/gql';
import Input from './Input';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';

import Vspace from './Vspace';
import TextArea from './TextArea';
import { Button } from './Button';
import { UPDATE_PRODUCT } from '../graphql/mutations';

interface Props {
  product: Product;
}

interface ProductForm {
  id: string;
  name: string;
  description: string;
  price: string;
  salePrice: string;
}

export default function ProductForm({ product }: Props) {
  return (
    <Vspace>
      <Mutation mutation={UPDATE_PRODUCT}>
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
                  <Button type="submit" disabled={props.isSubmitting}>
                    Submit
                  </Button>
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
      .get(),
  };
}
