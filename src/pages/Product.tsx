import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { Option } from 'catling';
import { Link } from 'react-router-dom';

import { Product } from '../types/gql';
import ProductForm from '../components/ProductForm';
import Card from '../components/Card';
import Section from '../components/Section';
import { Vspace } from '../components/Vspace';
import { FileInput } from '../components/FileInput';
import { SingleProductQuery, SINGLE_PRODUCT } from '../graphql/queries';

interface Props extends RouteComponentProps<{ id: string }> {}

export default function Product({ match }: Props) {
  const id = match.params.id;
  return (
    <Section>
      <h1>Products</h1>

      <Link to="/products">👈 All Products</Link>

      <SingleProductQuery query={SINGLE_PRODUCT} variables={{ id }}>
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
