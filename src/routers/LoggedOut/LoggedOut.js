import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/scaffold/Header/Header';
import Footer from 'components/scaffold/Footer/Footer';

import Login from 'components/views/Login/Login';
import Signup from 'components/views/Signup/Signup';
import NoMatch from 'components/views/NoMatch/NoMatch';

import 'index.scss';

const LoggedOut = () => {

  return (
    <>
      <Header />
      <main className="Main_wrapper">
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
      </main>
      <Footer />
    </>
  );

};

export default LoggedOut;
