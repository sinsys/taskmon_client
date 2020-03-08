import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/scaffold/Header/Header';
import Footer from 'components/scaffold/Footer/Footer';
import Menu from 'components/widgets/Menu/Menu';

import Dashboard from 'components/views/Dashboard/Dashboard';
import Tasks from 'components/views/Tasks/Tasks';
import Projects from 'components/views/Projects/Projects';
import NoMatch from 'components/views/NoMatch/NoMatch';

import 'index.scss';

const LoggedIn = () => {

  return (
    <>
      <Header />
      <main className="Main_wrapper">
        <Menu />
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
      </main>
      <Footer />
    </>
  );
};

export default LoggedIn;