import React from 'react';
import ReactDOM from 'react-dom';
import AuthedContextProvider from 'contexts/AuthedContextProvider';
import { BrowserRouter } from 'react-router-dom';
import Project from './Project';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<BrowserRouter>
      <AuthedContextProvider>
  		  <Project />
      </AuthedContextProvider>
  	</BrowserRouter>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});