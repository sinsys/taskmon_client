// View component - Root page for 404
import React from 'react';
import { Link } from 'react-router-dom';

// Files
import './NoMatch.scss';

const NoMatch = () => {

  return (

    <div className="Main">
      <p>Did you get lost?</p>
      <Link to='/'>Return to dashboard</Link>
    </div>
    
  );

};

export default NoMatch;