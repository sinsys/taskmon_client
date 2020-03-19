import React, {
  createContext,
  useReducer
} from "react";

let ItemsContext = createContext();

let initialState = {
  fetched: false,
  projects: [],
  tasks: [],
  all: [],
  error: null
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'set-items':
      return {
        ...state,
        fetched: true,
        projects: action.payload.projects,
        tasks: action.payload.tasks,
        all: action.payload.all
      }
    case 'set-tasks':
      return {
        ...state,
        tasks: action.payload
      }
    case 'set-projects':
      return {
        ...state,
        projects: action.payload
      }
    case 'set-all':
      return {
        ...state,
        all: action.payload
      }
    case 'refetch':
      return {
        ...state,
        fetched: false
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