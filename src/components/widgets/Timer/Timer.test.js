import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Timer from './Timer';

import { TimerContextProvider } from 'contexts/TimerContext/TimerContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  	<Router>
      <TimerContextProvider>
        <Timer />
      </TimerContextProvider>
  		
  	</Router>,
  	div
  );
  ReactDOM.unmountComponentAtNode(div);
});