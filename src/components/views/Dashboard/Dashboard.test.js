import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

import { UserContextProvider } from 'contexts/UserContext';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <UserContextProvider>
        <Dashboard />
      </UserContextProvider>
    </Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});