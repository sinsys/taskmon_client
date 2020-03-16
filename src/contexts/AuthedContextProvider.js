import React from 'react';
import { SessionContextProvider } from 'contexts/SessionContext';
import { ItemsContextProvider } from 'contexts/ItemsContext';

const AuthedContextProvider = (props) => {

  return (
    <SessionContextProvider>
      <ItemsContextProvider>
        { props.children }
      </ItemsContextProvider>
    </SessionContextProvider>
  );
};

export default AuthedContextProvider;