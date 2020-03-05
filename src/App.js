import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import config from './config.js';

import { UserProvider } from 'contexts/UserContext/UserContext';

import Login from 'components/views/Login/Login';
import Signup from 'components/views/Signup/Signup';

import 'App.scss';

function App() {

  const contextValue = {
    isLoggedIn: false
  };

  return (

    <div className="Taskmon">
      <UserProvider
        value={contextValue}
      >
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
      </UserProvider>
    </div>
    
  );

};

export default App;
