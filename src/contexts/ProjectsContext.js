import React, {
  createContext,
  useReducer
} from "react";

import ProjectsApiService from 'services/projects-service';

let ProjectsContext = createContext();

let initialState = {
  projects: [],
  error: null
};

let reducer = (state, action) => {
  switch (action.type) {
    case "get-projects":
      return {
        ...state,
        projects: ProjectsApiService.getProjects()
      }
    default:
      return initialState;
  }
};

const ProjectsContextProvider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };
  return (
    <ProjectsContext.Provider value={value}>
      {props.children}
    </ProjectsContext.Provider>
  );
};

let ProjectsContextConsumer = ProjectsContext.Consumer;

export { ProjectsContext, ProjectsContextProvider, ProjectsContextConsumer };