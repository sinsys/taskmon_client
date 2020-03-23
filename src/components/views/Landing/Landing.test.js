import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './Landing';

import { UserContextProvider } from 'contexts/UserContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
      <UserContextProvider>
        <Landing />
      </UserContextProvider>
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});