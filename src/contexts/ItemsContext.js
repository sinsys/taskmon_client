// Context for our tasks, projects, and a boolean if data is fetched or not
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

// Allows dispatch actions to update our state
let reducer = (state, action) => {
  switch (action.type) {
    // Set our projects and tasks from our response
    case 'set-items':
      return {
        ...state,
        fetched: true,
        projects: action.payload.projects,
        tasks: action.payload.tasks,
        all: action.payload.all
      }
    // Update only the tasks
    case 'set-tasks':
      return {
        ...state,
        tasks: action.payload
      }
    // Update only the projects
    case 'set-projects':
      return {
        ...state,
        projects: action.payload
      }
    // Set all items for dashboard
    case 'set-all':
      return {
        ...state,
        all: action.payload
      }
    // Trigger to refetch our items from the database
    case 'refetch':
      return {
        ...state,
        fetched: false
      }
    // Set errors in state if any exist
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