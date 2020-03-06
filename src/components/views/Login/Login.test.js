import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

import { UserContextProvider } from 'contexts/UserContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
      <UserContextProvider>
        <Login />
      </UserContextProvider>
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});