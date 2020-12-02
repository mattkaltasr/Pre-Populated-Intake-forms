import React from "react";
import PropTypes from "prop-types";

import "./Checkbox.css";

const Checkbox = ({ title, checked, onChange, ...containerProps }) => (
  <div
    className="flex checkbox-outer action-area"
    onClick={(e) => {
      e.stopPropagation();
      onChange(!checked);
    }}
    {...containerProps}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      style={{ margin: "auto 0.25em auto 0.25em" }}
    />
    <span style={{ margin: "auto auto auto 0.5em" }}>{title}</span>
  </div>
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Checkbox.defaultProps = {
  title: null,
};

export default Checkbox;
