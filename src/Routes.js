// Routes - This is our surface level router for if a user is logged in or not
import React, { useContext, useEffect } from 'react';

// Services
import TokenService from 'services/token-service';

// Contexts
import { UserContext } from 'contexts/UserContext';

// Secondary Routers - Used to display different pages for logged in or logged out paths
import LoggedOut from 'routers/LoggedOut/LoggedOut';
import LoggedIn from 'routers/LoggedIn/LoggedIn';

// Files
import 'index.scss';

export const Routes = () => {

  let { state } = useContext(UserContext);
  useEffect(() => {
    
  }, [state]);

  return (
    <div id="Taskmon" className="Taskmon">
      {TokenService.hasAuthToken()
        ? <LoggedIn />
        : <LoggedOut />
      }
    </div>
  );
};
