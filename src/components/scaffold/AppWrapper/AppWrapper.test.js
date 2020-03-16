import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './AppWrapper';

import AuthedContextProvider from 'contexts/AuthedContextProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <AuthedContextProvider>
        <AppWrapper />
      </AuthedContextProvider>
    </Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});