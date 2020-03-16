import React, {
  createContext,
  useReducer
} from "react";

let ItemsContext = createContext();

let initialState = {
  fetched: false,
  projects: [],
  tasks: [],
  error: null
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'set-items':
      return {
        ...state,
        fetched: true,
        projects: action.payload.projects,
        tasks: action.payload.tasks
      }
    case 'set-error':
      return {
        ...state,
        error: action.payload
      }
    default:
      return initialState;
  }
};

const ItemsContextProvider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <ItemsContext.Provider value={value}>
      {props.children}
    </ItemsContext.Provider>
  );
};

let ItemsContextConsumer = ItemsContext.Consumer;

export { ItemsContext, ItemsContextProvider, ItemsContextConsumer };