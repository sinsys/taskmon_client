import React from 'react';
import ReactDOM from 'react-dom';
import AuthedContextProvider from 'contexts/AuthedContextProvider';
import { BrowserRouter } from 'react-router-dom';
import EditTaskForm from './EditTaskForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const contextTask = { project_id: null };
  ReactDOM.render(
  	<BrowserRouter>
      <AuthedContextProvider>
  		  <EditTaskForm />
      </AuthedContextProvider>
  	</BrowserRouter>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});