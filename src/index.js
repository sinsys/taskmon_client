import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from 'contexts/UserContext';
import { Routes } from 'Routes';

import 'index.scss';

ReactDOM.render(
  <Router>
    <UserContextProvider>
      <Routes />
    </UserContextProvider> 
  </Router>, 
  document.getElementById('root')
);