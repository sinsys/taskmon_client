// Redirect utility for authenticated users
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from 'services/token-service';

const PrivateRoute = ({ component, ...props }) => {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps} />
          : <Redirect
              to={{
                pathname: '/login'
              }}
            />
      )}
    />
  );
};

export default PrivateRoute;
