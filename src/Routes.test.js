import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'Routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
  		<Routes />
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});