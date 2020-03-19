import React from 'react';
import { SessionContextProvider } from 'contexts/SessionContext';
import { ItemsContextProvider } from 'contexts/ItemsContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const AuthedContextProvider = (props) => {

  return (
    <SessionContextProvider>
      <ItemsContextProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          { props.children }
        </MuiPickersUtilsProvider>
      </ItemsContextProvider>
    </SessionContextProvider>
  );
};

export default AuthedContextProvider;