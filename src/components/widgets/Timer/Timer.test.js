import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Timer from './Timer';

import { SessionContextProvider } from 'contexts/SessionContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
      <SessionContextProvider>
        <Timer />
      </SessionContextProvider>
  		
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});