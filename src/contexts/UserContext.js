import React, {
  createContext,
  useReducer
} from "react";

let UserContext = createContext();

let initialState = {
  name: 'Guest',
  isLoggedIn: false,
  hydration: true
};

let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        name: "Guest"
      };
    case "logout":
      return initialState
    default:
      return initialState
  }
};

const UserContextProvider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

let UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };