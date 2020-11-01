import React from "react";
import PropTypes from "prop-types";

import "./TextInput.css";

const FormLabel = ({ title, isRequired }) => (
  <span className="input-title">
    {title}{" "}
    {isRequired ? (
      <strong style={{ color: "red", fontSize: "1.1em" }}>*</strong>
    ) : null}
  </span>
);

FormLabel.propTypes = {
  title: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};

FormLabel.defaultProps = {
  isRequired: false,
};

export default FormLabel;
