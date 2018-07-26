import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const app = (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
