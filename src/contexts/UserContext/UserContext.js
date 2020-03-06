import * as React from "react";

let UserContext = React.createContext();

let initialState = {
  isLoggedIn: false
};

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "login":
      return {
        ...state, 
        isLoggedIn: true,
        name: "Test Account"
      };
    case "logout":
      return { ...state, isLoggedIn: false };
    default:
      return { ...state }
  }
};

function UserContextProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}

let UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };