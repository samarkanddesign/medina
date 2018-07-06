import * as React from 'react';
import { ProductListRootQueryTypeArgs, PagedProducts } from 'src/types/gql';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Option } from 'catling';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import { prop } from 'ramda';

interface Props {}

class AllProductsQuery extends Query<
  { productList?: PagedProducts },
  ProductListRootQueryTypeArgs
> {}

const allProducts = gql`
  query ProductList($page: Int) {
    productList(page: $page) {
      products {
        id
        name
        price
        slug
        thumbnail {
          url
        }
      }
      pagination {
        totalPages
      }
    }
  }
`;

const ProductRow = styled('li')`
  list-style-type: none;
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
`;

export default function Products({  }: Props) {
  return (
    <section>
      <AllProductsQuery query={allProducts}>
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
                <ProductRow key={product.id}>
                  <img
                    style={{ width: 75, height: 75 }}
                    src={Option(product.thumbnail)
                      .map(prop('url'))
                      .getOrElse('https://via.placeholder.com/75x75')}
                  />

                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </ProductRow>
              )),
            )
            .map(list => <ul>{list}</ul>)
            .getOrElse(<p>no products here</p>);
        }}
      </AllProductsQuery>
    </section>
  );
}
