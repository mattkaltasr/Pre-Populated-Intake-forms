import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./FormContainer.css";

const FormContainer = ({ title, formComponents, complete }) => {
  const isError = false;

  return (
    <div
      className={classnames("flex flex-col form-container", {
        error: isError,
        complete,
      })}
    >
      <span className="container-title">{title}</span>
      <div className="flex">{formComponents}</div>
    </div>
  );
};

FormContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  formComponents: PropTypes.node.isRequired,
  complete: PropTypes.bool,
};

FormContainer.defaultProps = {
  complete: false,
};

export default FormContainer;
