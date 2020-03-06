import React from 'react';

import './Timer.scss';

function Timer(props) {

  const now = new Date();
  let timerString = `
    ${now.getHours()}:
    ${now.getMinutes()}:
    ${now.getSeconds()}`;

  return (
    <div 
      className="timer"
    >
      <p>{timerString}</p>
    </div>
  );
};

export default Timer;