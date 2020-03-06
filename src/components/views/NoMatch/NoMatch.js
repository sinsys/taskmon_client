import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatch.scss';

function NoMatch() {

  return (
    <main className="Main_wrapper">
      <div className="Main">
        <p>Did you get lost?</p>
        <Link to='/dashboard'>Return to dashboard</Link>
      </div>
    </main>
  );

};

export default NoMatch;
