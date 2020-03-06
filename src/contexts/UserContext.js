import React, {
  createContext,
  useReducer
} from "react";

let UserContext = createContext();

let initialState = {
  isLoggedIn: false
};

let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        name: "Test Account"
      };
    case "logout":
      return initialState
    default:
      return initialState
  }
};

function UserContextProvider(props) {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}

let UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };