import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./TextInput.css";

const FormLabel = ({ title, isRequired, small }) => (
  <span className={classNames("input-title", { small })}>
    {title}{" "}
    {isRequired ? (
      <strong style={{ color: "red", fontSize: "1.1em" }}>*</strong>
    ) : null}
  </span>
);

FormLabel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isRequired: PropTypes.bool,
  small: PropTypes.bool,
};

FormLabel.defaultProps = {
  isRequired: false,
  small: false,
};

export default FormLabel;
