import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import axios from 'axios';

import { Product } from 'src/types/gql';
import ProductForm from 'src/components/ProductForm';
import Card from 'src/components/Card';
import Section from 'src/components/Section';
import { Vspace } from 'src/components/Vspace';
import { FileInput } from '../components/FileInput';
import { Option } from 'catling';

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
    <Section>
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
              <Vspace>
                <Card>
                  <ProductForm product={data.product} />
                </Card>
                <Card>
                  <ProductImageForm
                    productId={id}
                    refetch={() => refetch({ id })}
                  />
                </Card>
                <div>
                  {data.product.images.map(i => (
                    <img
                      key={i.id}
                      src={i.url}
                      style={{ height: '50px', width: 'auto' }}
                    />
                  ))}
                </div>
              </Vspace>
            );
          }

          return '😭';
        }}
      </SingleProductQuery>
    </Section>
  );
}

interface ProductImageFormProps {
  productId: string;
  refetch: () => void;
}

class ProductImageForm extends React.Component<
  ProductImageFormProps,
  { inputKey: number; uploading: boolean }
> {
  state = {
    inputKey: 1,
    uploading: false,
  };

  handleUpload = (file: Option<File>) => {
    file.forEach(f => {
      this.setState({ uploading: true });
      const data = new FormData();
      data.append('product_id', this.props.productId);
      data.append('image', f);

      axios
        .post('http://localhost:4000/api/product_images', data)
        .then(r => {
          this.props.refetch();
          this.setState(state => ({
            inputKey: state.inputKey + 1,
            uploading: false,
          }));
          console.log(r);
        })
        .catch(e => {
          this.setState(state => ({
            inputKey: state.inputKey + 1,
            uploading: false,
          }));
          console.log(e);
        });
    });
  };

  render() {
    return (
      <form>
        {/* <input type="file" ref={el => (this.uploadInput = el)} /> */}
        <FileInput
          onChange={this.handleUpload}
          inputKey={this.state.inputKey}
          uploading={this.state.uploading}
        />
        <button type="submit">Upload</button>
      </form>
    );
  }
}
