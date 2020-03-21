import React from 'react';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './ErrorMsg.scss';
const ErrorMsg = (props) => {
  return (
    <span className="form-error-label">
      <FontAwesomeIcon icon={faExclamationCircle} />
      {props.message}
    </span>
  );
}

export default ErrorMsg;