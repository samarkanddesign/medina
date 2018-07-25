import * as React from 'react';
import { Option } from 'catling';
import { prop } from 'ramda';
import { Link } from 'react-router-dom';
import { Product } from '../types/gql';
import Price from './Price';
import styled from '../../node_modules/react-emotion';
import { spacing, pallette } from './style';

interface TableProps {
  children: React.ReactNode;
}
const StyledTable = styled('table')`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  th {
    background: ${pallette.goodfriends.midbrown};
    color: #fff;
  }
  td,
  th {
    padding: ${spacing.ant} ${spacing.cat};
  }
  tr:nth-child(2n) {
    background: #eee;
  }
`;

const Table = ({ children }: TableProps) => (
  <StyledTable>
    <thead>
      <Header />
    </thead>
    <tbody>{children}</tbody>
  </StyledTable>
);

const Header = () => {
  return (
    <tr>
      <th>SKU</th>
      <th colSpan={2} />
      <th>🏷</th>
    </tr>
  );
};

interface ProductRowProps {
  product: Product;
}

const Row = ({ product }: ProductRowProps) => {
  return (
    <tr>
      <td>{product.sku}</td>
      <td>
        <img
          style={{ width: 75, height: 75 }}
          src={Option(product.thumbnail)
            .map(prop('url'))
            .getOrElse('https://via.placeholder.com/75x75')}
        />
      </td>
      <td>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </td>
      <td>
        <Price price={product.price} salePrice={product.salePrice} />
      </td>
    </tr>
  );
};

export const ProductTable = { Header, Row, Table };
