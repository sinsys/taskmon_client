// Scaffolding Component - This is an fetch wrapper to listen and refetch data if needed
import React, { useContext, useEffect } from 'react';

// Services
import ProjectsApiService from 'services/projects-service';
import TasksApiService from 'services/tasks-service';
import TokenService from 'services/token-service';
import SettingsApiService from 'services/settings-service';

// Contexts
import { ItemsContext } from 'contexts/ItemsContext';
import { UserContext } from 'contexts/UserContext';

// Helpers
import { addAdditionalProperties as modifyQuery } from 'helpers/helpers';

const AppWrapper = (props) => {

  let itemsContext = useContext(ItemsContext);
  let { dispatch } = useContext(UserContext);

  // Logs the user in and sets their settings to the session
  let login = (settings) => dispatch({
    type: "login",
    data: settings
  });

  useEffect(() => {
    // Listener effect to refetch data if our itemsContext.state.fetched is changed
    if ( !itemsContext.state.fetched && TokenService.hasAuthToken() ) {
      Promise.all([
        ProjectsApiService.getProjects(), 
        TasksApiService.getTasks(),
        SettingsApiService.getSettings()
      ])
        .then(([projects, tasks, settings]) => {

          // Sets our itemsContext values with returned data from our API
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