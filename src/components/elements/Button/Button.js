import React from 'react';

import './Button.scss';

function Button(props) {
  return (
    <button
      {...props}
    >
      {props.text}
    </button>
  )
}

export default Button;