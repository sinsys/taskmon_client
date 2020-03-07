import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import { SessionContextProvider } from 'contexts/SessionContext';

import Header from 'components/scaffold/Header/Header';
import Footer from 'components/scaffold/Footer/Footer';

import Login from 'components/views/Login/Login';
import Signup from 'components/views/Signup/Signup';

import Dashboard from 'components/views/Dashboard/Dashboard';
import Tasks from 'components/views/Tasks/Tasks';
import Projects from 'components/views/Projects/Projects';

import NoMatch from 'components/views/NoMatch/NoMatch';

import 'index.scss';

export const Routes = () => {

  let { state } = useContext(UserContext);

  const renderLoggedOut = () => {
    return (
      <Switch>
        <Route
          exact path={'/'}
          component={Login}
        />
        <Route
          exact path={'/signup'}
          component={Signup}
        />
        <Route component={NoMatch} />
      </Switch> 
    );
  };

  const renderLoggedIn = () => {
    return (
      <SessionContextProvider>
        <Switch>
          <Route
            exact path={'/'}
            component={Dashboard}
          />
          <Route
            exact path={'/tasks'}
            component={Tasks}
          />
          <Route
            exact path={'/projects'}
            component={Projects}
          />
          <Route component={NoMatch} />
        </Switch>
      </SessionContextProvider>
    );
  };

  return (
    <div className="Taskmon">
      <Header />
        {state.isLoggedIn
          ? renderLoggedIn()
          : renderLoggedOut()
        }
      <Footer />
    </div>
  );
};