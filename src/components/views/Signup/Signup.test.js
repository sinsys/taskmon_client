import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'contexts/UserContext';
import Signup from './Signup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
      <UserContextProvider>
        <Signup />
      </UserContextProvider>
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});