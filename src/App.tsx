import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import * as logo from './samarkand-logo-250.svg';
import Products from './pages/Products';
import Product from './pages/Product';
import LoginPage from './pages/LoginPage';
import styled from 'react-emotion';
import { pallette, spacing } from './components/style';

const StyledHeader = styled('header')`
  background: ${pallette.goodfriends.darkbrown};
  padding: ${spacing.cat};
  color: #fff;
  display: flex;
  a {
    color: #fff;
  }
`;

const Header = () => (
  <StyledHeader className="App-header">
    <img src={logo} style={{ width: '50px', height: '50px' }} />

    <ul>
      <li>
        <Link to="products">Products</Link>
      </li>
    </ul>
  </StyledHeader>
);

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/products" component={Products} />
        </Switch>
      </div>
    );
  }
}

export default App;
