import React from "react";
import PropTypes from "prop-types";

import "./Checkbox.css";

const Checkbox = ({ title, checked, fieldName, setFieldValue }) => {
  return (
    <div
      className="flex checkbox-outer action-area"
      onClick={() => setFieldValue(fieldName, !checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setFieldValue(fieldName, !checked)}
      />
      <span style={{ marginLeft: "0.5em" }}>{title}</span>
    </div>
  );
};

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  fieldName: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default Checkbox;
