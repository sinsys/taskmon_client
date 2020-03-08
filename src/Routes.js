import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import { SessionContextProvider } from 'contexts/SessionContext';

import LoggedOut from 'routers/LoggedOut/LoggedOut';
import LoggedIn from 'routers/LoggedIn/LoggedIn';

import 'index.scss';

export const Routes = () => {

  let { state } = useContext(UserContext);

  return (
    <div id="Taskmon" className="Taskmon">
      {state.isLoggedIn
        ? <SessionContextProvider>
            <LoggedIn />
          </SessionContextProvider>
        : <LoggedOut />
      }
    </div>
  );
};