import React, {
  createContext,
  useReducer
} from "react";
import TokenService from 'services/token-service';

let UserContext = createContext();

let initialState = {
  nickname: '',
  isLoggedIn: false,
  hydration: null,
  fetched: false
};

let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        nickname: action.data.nickname,
        isLoggedIn: true,
        hydration: action.data.hydration,
        fetched: true
      };
    case "logout":
      TokenService.clearAuthToken();
      return {
        name: '',
        isLoggedIn: false,
        hydration: true,
        fetched: false
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