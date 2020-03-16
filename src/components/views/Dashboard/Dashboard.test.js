import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

import { UserContextProvider } from 'contexts/UserContext';
import AuthedContextProvider from 'contexts/AuthedContextProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <UserContextProvider>
        <AuthedContextProvider>
          <Dashboard />
        </AuthedContextProvider>
      </UserContextProvider>
    </Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});