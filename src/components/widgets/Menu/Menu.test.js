import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import OffCanvasMenu from './Menu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
  		<OffCanvasMenu />
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});