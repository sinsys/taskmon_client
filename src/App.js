import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import config from './config.js';

import UserContextProvider from './contexts/UserContext/UserContext';

import Login from './components/views/Login/Login';
import Signup from './components/views/Signup/Signup';

import './App.scss';

function App() {

  return (

    <div className="Taskmon">
      <UserContextProvider>
        <Switch>
        <Route
          exact path={'/'}
          key={'/'}
          component={Login}
        />
        <Route
          exact path={'/signup'}
          key={'/signup'}
          component={Signup}
        />
        </Switch>
      </UserContextProvider>
    </div>

  );

};

export default App;
