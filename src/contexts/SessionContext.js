// Context for our session - A global context handler
import React, {
  createContext,
  useReducer
} from "react";

// Utilities/helpers
import { getTimeString } from 'helpers/helpers';

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

// Allows dispatch actions to update our state
let reducer = (state, action) => {
  switch (action.type) {
    // Start the timer and set it active. Record when timer started
    case "start-session":
      return {
        ...state,
        timer: {
          ...state.timer,
          start: new Date(),
          active: true
        }
      }
    // Ends the current sessios and sets it inactive. Records when timer ended
    case "stop-session":
      return {
        ...state,
        timer: {
          ...state.timer,
          end: new Date(),
          active: false
        }
      }
    // Used to update the session timer string
    case "update-string":
      return {
        ...state,
        timer: {
          ...state.timer,
          string: getTimeString("since", state.timer.start)
        }
      }
    // Open or close the off-canvas menu
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