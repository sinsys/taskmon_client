import React, { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

import './Tasks.scss';

const Tasks = () => {

  let { state } = useContext(UserContext);

  return (
    <main className="Main_wrapper">
      <div className="Main">
        <h2>Tasks for {state.name}</h2>
      </div>
    </main>
  );

};

export default Tasks;