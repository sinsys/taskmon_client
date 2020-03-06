import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContextProvider }from 'contexts/UserContext/UserContext';

import Header from 'components/scaffold/Header/Header';
import Footer from 'components/scaffold/Footer/Footer';
import Login from 'components/views/Login/Login';
import Signup from 'components/views/Signup/Signup';
import Dashboard from 'components/views/Dashboard/Dashboard';
import NoMatch from 'components/views/NoMatch/NoMatch';

import 'index.scss';

export const Routes = () => {

  return (
    <UserContextProvider>
      <div className="Taskmon">
        <Header />
          <Switch>
            <Route
              exact path={'/'}
              component={Login}
            />
            <Route
              exact path={'/signup'}
              component={Signup}
            />
            <Route
              exact path={'/dashboard'}
              component={Dashboard}
            />
            <Route component={NoMatch} />
          </Switch>
        <Footer />
      </div>
    </UserContextProvider>
    
  );

};