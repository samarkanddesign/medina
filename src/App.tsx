import * as React from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';

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
        <DashboardRoute exact path="/products/:id(\d+)" component={Product} />
        <DashboardRoute exact path="/products" component={Products} />
        <Route render={() => 'Not Found 😮'} />
      </Switch>
    );
  }
}

const DashboardRoute = ({ component: Component, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EnsureAuth>
          <Main>{Component && <Component {...matchProps} />}</Main>
        </EnsureAuth>
      )}
    />
  );
};

export default App;
