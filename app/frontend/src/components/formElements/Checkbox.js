import React from "react";

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

export default Checkbox;
