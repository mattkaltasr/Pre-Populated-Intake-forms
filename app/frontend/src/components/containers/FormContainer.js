import React from 'react';
import classnames from 'classnames';

import './FormContainer.css';

const FormContainer = ({ title, renderFormComponents }) => {

  /** dynamically set css classes for container */
  const isError = false;

  return <div className={classnames("flex flex-col form-container", { error: isError, complete: false })}>
            <span className="container-title">{title}</span>
            <div>
              {renderFormComponents()}
            </div>
        </div>

}

export default FormContainer