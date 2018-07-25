import * as React from 'react';
import { Option } from 'catling';

import { AllProductsQuery, ALL_PRODUCTS } from '../graphql/queries';
import { ProductTable } from '../components/ProductTable';

interface Props {}

export default function Products({  }: Props) {
  return (
    <section>
      <AllProductsQuery query={ALL_PRODUCTS}>
        {({ data, error, loading }) => {
          if (loading) {
            return <span>loading...</span>;
          }

          if (error) {
            return <pre>{JSON.stringify(error, null, ' ')}</pre>;
          }

          return Option(data)
            .flatMap(d => Option(d.productList))
            .map(p =>
              p.products.map(product => (
                <ProductTable.Row product={product} key={product.id} />
              )),
            )
            .map(rows => <ProductTable.Table>{rows}</ProductTable.Table>)
            .getOrElse(<p>no products here</p>);
        }}
      </AllProductsQuery>
    </section>
  );
}
