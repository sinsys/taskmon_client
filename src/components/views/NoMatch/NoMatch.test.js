import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import NoMatch from './NoMatch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
  		<NoMatch />
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});