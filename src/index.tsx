import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'normalize.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';
import { client } from './graphql/client';
import { injectGlobal } from '../node_modules/emotion';
import { pallette } from './components/style';

injectGlobal`
  a {
    color: ${pallette.goodfriends.darkbrown};
    &:hover {
      color: ${pallette.goodfriends.midbrown};
    }
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
