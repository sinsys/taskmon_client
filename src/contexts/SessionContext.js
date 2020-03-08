import React, {
  createContext,
  useReducer
} from "react";

import { getTimeString } from 'helpers/dates.js';

let SessionContext = createContext();

let initialState = {
  menu: {
    open: false,
    toggleMenu: () => {}
  },
  timer: {
    start: new Date(),
    end: null,
    active: true,
    string: ''
  },
  hydration: {
    percent: 25
  }
};

let reducer = (state, action) => {
  switch (action.type) {
    case "start-session":
      return {
        ...state,
        timer: {
          ...state.timer,
          start: new Date(),
          active: true
        }
      }
    case "stop-session":
      return {
        ...state,
        timer: {
          ...state.timer,
          end: new Date(),
          active: false
        }
      }
    case "update-string":
      return {
        ...state,
        timer: {
          ...state.timer,
          string: getTimeString("since", state.timer.start)
        }
      }
    case "toggle-menu":
      return {
        ...state,
        menu: {
          open: !state.menu.open
        }
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