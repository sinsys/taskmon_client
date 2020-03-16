import React, { useContext, useEffect } from 'react';

import ProjectsApiService from 'services/projects-service';
import TasksApiService from 'services/tasks-service';

import { ItemsContext } from 'contexts/ItemsContext';

import TokenService from 'services/token-service';

const AppWrapper = (props) => {

  let itemsContext = useContext(ItemsContext);

  useEffect(() => {
    if ( !itemsContext.state.fetched && TokenService.hasAuthToken() ) {
      Promise.all([
        ProjectsApiService.getProjects(), 
        TasksApiService.getTasks()
      ])
        .then(([projects, tasks]) => {
          itemsContext.dispatch({
            type: 'set-items',
            payload: {projects, tasks}
          });
        });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="Main_wrapper">
      { props.children }
    </main>
  );

};

export default AppWrapper;