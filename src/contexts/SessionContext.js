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
    start: new Date().getTime(),
    percent: 0,
    interval: 7200000, // 2 hours in milliseconds - Will add as customizable setting later
    alert: false,
    flash: false
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
    // Set hydration percent
    case "set-hydration":
      return {
        ...state,
        hydration: {
          ...state.hydration,
          percent: action.payload
        }
      }
    case "set-hydration-alert":
      return {
        ...state,
        hydration: {
          ...state.hydration,
          alert: true
        }
      }
    case "reset-hydration":
      return {
        ...state,
        hydration: {
          ...state.hydration,
          start: new Date().getTime(),
          percent: 100,
          alert: false
        }
      }
    case "toggle-flash":
      return {
        ...state,
        hydration: {
          ...state.hydration,
          flash: !state.hydration.flash
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