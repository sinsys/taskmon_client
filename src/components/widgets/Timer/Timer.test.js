import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Timer from './Timer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
  		<Timer />
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});