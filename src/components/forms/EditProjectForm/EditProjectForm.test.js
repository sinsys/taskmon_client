import React from 'react';
import ReactDOM from 'react-dom';
import AuthedContextProvider from 'contexts/AuthedContextProvider';
import { BrowserRouter } from 'react-router-dom';
import EditProjectForm from './EditProjectForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<BrowserRouter>
      <AuthedContextProvider>
  		  <EditProjectForm />
      </AuthedContextProvider>
  	</BrowserRouter>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});