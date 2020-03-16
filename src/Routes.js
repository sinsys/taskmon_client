import React, { useContext, useEffect } from 'react';

import TokenService from 'services/token-service';

import LoggedOut from 'routers/LoggedOut/LoggedOut';
import LoggedIn from 'routers/LoggedIn/LoggedIn';

import { UserContext } from 'contexts/UserContext';

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
