// Provides the multiple Contexts we need throughout the app into one component
import React from 'react';

// Context Providers
import { SessionContextProvider } from 'contexts/SessionContext';
import { ItemsContextProvider } from 'contexts/ItemsContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Utilities/helpers
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