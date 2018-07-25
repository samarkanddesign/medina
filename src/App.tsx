import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Products from './pages/Products';
import Product from './pages/Product';
import LoginPage from './pages/LoginPage';

import EnsureAuth from './components/EnsureAuth';
import Main from './layouts/Main';

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route component={AppRoutes} />
      </Switch>
    );
  }
}

const AppRoutes = () => {
  return (
    <Switch>
      <EnsureAuth>
        <Main>
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/products" component={Products} />
        </Main>
      </EnsureAuth>
      <Route render={() => 'Not Found 😮'} />
    </Switch>
  );
};

export default App;
