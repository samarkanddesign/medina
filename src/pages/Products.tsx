import * as React from 'react';
import { ProductListRootQueryTypeArgs, PagedProducts } from 'src/types/gql';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Option } from 'catling';
import { Link } from 'react-router-dom';

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

export default function Products({ }: Props) {
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
                <li key={product.id}>
                  {Option(product.thumbnail)
                    .map(thumb => (
                      <img
                        style={{ width: 150, height: 150 }}
                        src={thumb.url}
                      />
                    ))
                    .get()}
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              )),
            )
            .map(list => <ul>{list}</ul>)
            .getOrElse(<p>no products here</p>);
        }}
      </AllProductsQuery>
    </section>
  );
}
