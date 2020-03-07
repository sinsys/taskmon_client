import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

import { UserContextProvider } from 'contexts/UserContext';
import { SessionContextProvider } from 'contexts/SessionContext';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <UserContextProvider>
        <SessionContextProvider>
          <Dashboard />
        </SessionContextProvider>
      </UserContextProvider>
    </Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});