import React, {
  createContext,
  useReducer
} from "react";

import { getTimeString } from 'helpers/dates.js';

let SessionContext = createContext();

let initialState = {
  start: null,
  end: null,
  active: false,
  string: ''
};

let reducer = (state, action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        start: new Date(),
        active: true
      }
    case "stop":
      return {
        ...state,
        end: new Date(),
        active: false
      }
    case "update-string":
      return {
        ...state,
        string: getTimeString("since", state.start)
      }
    default:
      return {
        ...initialState
      };
  }
};

const SessionContextProvider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <SessionContext.Provider value={value}>
      {props.children}
    </SessionContext.Provider>
  );
};

let SessionContextConsumer = SessionContext.Consumer;

export { SessionContext, SessionContextProvider, SessionContextConsumer };