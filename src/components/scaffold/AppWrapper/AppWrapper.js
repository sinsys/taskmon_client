import React, { useContext, useEffect } from 'react';

// Importing these globally for our date-pickers
// They use Context to have access to their utility functions
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import ProjectsApiService from 'services/projects-service';
import TasksApiService from 'services/tasks-service';
import SettingsApiService from 'services/settings-service';

import { ItemsContext } from 'contexts/ItemsContext';
import { UserContext } from 'contexts/UserContext';

import { addAdditionalProperties } from 'helpers/helpers';

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
            payload: addAdditionalProperties(projects, tasks)
          });

          login(settings);

        });
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <main className="Main_wrapper">
        { props.children }
      </main>
    </MuiPickersUtilsProvider>
  );

};

export default AppWrapper;