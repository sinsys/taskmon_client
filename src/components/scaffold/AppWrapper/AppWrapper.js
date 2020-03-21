import React, { useContext, useEffect } from 'react';

import ProjectsApiService from 'services/projects-service';
import TasksApiService from 'services/tasks-service';
import SettingsApiService from 'services/settings-service';

import { ItemsContext } from 'contexts/ItemsContext';
import { UserContext } from 'contexts/UserContext';

import { addAdditionalProperties as modifyQuery } from 'helpers/helpers';

import TokenService from 'services/token-service';

const AppWrapper = (props) => {

  let itemsContext = useContext(ItemsContext);
  let { dispatch } = useContext(UserContext);

  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });

  useEffect(() => {
    if ( !itemsContext.state.fetched && TokenService.hasAuthToken() ) {
      Promise.all([
        ProjectsApiService.getProjects(), 
        TasksApiService.getTasks(),
        SettingsApiService.getSettings()
      ])
        .then(([projects, tasks, settings]) => {

          itemsContext.dispatch({
            type: 'set-items',
            payload: modifyQuery(projects, tasks)
          });

          login(settings);

        });
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  return (
    <>
      {itemsContext.state.fetched
        ? <main className="Main_wrapper">
            { props.children }
          </main>
        : <main className="Main_wrapper">
            <p className="fetching">Fetching data. Please wait...</p>
          </main>
      }
    </>

  );

};

export default AppWrapper;