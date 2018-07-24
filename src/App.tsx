import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import logo from './samarkand-logo-250.svg';
import Products from './pages/Products';
import Product from './pages/Product';
import LoginPage from './pages/LoginPage';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Samarkand Medina</h1>

          <ul>
            <li>
              <Link to="products">Products</Link>
            </li>
          </ul>
        </header>
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
