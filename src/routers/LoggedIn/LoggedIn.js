import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/scaffold/Header/Header';
import Footer from 'components/scaffold/Footer/Footer';
import Menu from 'components/widgets/Menu/Menu';

import Dashboard from 'components/views/Dashboard/Dashboard';
import Tasks from 'components/views/Tasks/Tasks';
import Task from 'components/views/Task/Task';
import Projects from 'components/views/Projects/Projects';
import Project from 'components/views/Project/Project';
import Settings from 'components/views/Settings/Settings';
import NoMatch from 'components/views/NoMatch/NoMatch';

import PrivateRoute from 'utils/PrivateRoute';

import 'index.scss';

const LoggedIn = () => {

  return (
    <>
      <Header />
      <main className="Main_wrapper">
        <Menu />
        <Switch>
          <PrivateRoute
            exact path={'/'}
            component={Dashboard}
          />
          <PrivateRoute
            exact path={'/tasks'}
            component={Tasks}
          />
          <PrivateRoute
            exact path={'/projects'}
            component={Projects}
          />
          <PrivateRoute
            exact path={'/tasks/:id'}
            component={Task}
          />
          <PrivateRoute
            exact path={'/projects/:id'}
            component={Project}
          />
          <PrivateRoute
            exact path={'/settings'}
            component={Settings}
          />
          <Route component={NoMatch} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default LoggedIn;