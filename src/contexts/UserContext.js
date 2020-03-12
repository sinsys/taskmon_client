import React, {
  createContext,
  useReducer
} from "react";
import TokenService from 'services/token-service';

let UserContext = createContext();

let initialState = {
  name: '',
  isLoggedIn: TokenService.hasAuthToken(),
  hydration: true
};

let reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        name: action.data
      };
    case "logout":
      TokenService.clearAuthToken();
      return {
        ...initialState
      }
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