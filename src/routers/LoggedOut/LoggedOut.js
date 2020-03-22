// Logged out Router - User is logged out
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Additional Route checks - Offers redirects when user is logged out
import PublicOnlyRoute from 'utils/PublicOnlyRoute';

// App Scaffolding
import Header from 'components/scaffold/Header/Header';
import Footer from 'components/scaffold/Footer/Footer';

// Views
import Login from 'components/views/Login/Login';
import Signup from 'components/views/Signup/Signup';
import NoMatch from 'components/views/NoMatch/NoMatch';

// Files
import 'index.scss';

const LoggedOut = () => {

  return (
    <>
      <Header />
      <main className="Main_wrapper">
        <Switch>
          <PublicOnlyRoute
            exact path={'/'}
            component={Login}
          />
          <PublicOnlyRoute
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
