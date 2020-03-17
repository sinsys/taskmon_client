import React, { useContext, useEffect } from 'react';

import ProjectsApiService from 'services/projects-service';
import TasksApiService from 'services/tasks-service';
import SettingsApiService from 'services/settings-service';

import { ItemsContext } from 'contexts/ItemsContext';
import { UserContext } from 'contexts/UserContext';

import TokenService from 'services/token-service';



const AppWrapper = (props) => {

  let itemsContext = useContext(ItemsContext);
  let userContext = useContext(UserContext);

  let { dispatch } = useContext(UserContext);

  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });

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
    if ( !userContext.state.fetched && TokenService.hasAuthToken() ) {
      SettingsApiService.getSettings()
        .then(res => {
          login(res);
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="Main_wrapper">
      { props.children }
    </main>
  );

};

export default AppWrapper;