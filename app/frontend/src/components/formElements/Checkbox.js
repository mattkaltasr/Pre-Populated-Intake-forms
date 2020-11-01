import React from "react";

import "./Checkbox.css";

const Checkbox = ({ title }) => {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <div className="flex checkbox-outer" onClick={() => setChecked(!isChecked)}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setChecked(!isChecked)}
      />
      <span style={{ marginLeft: "0.5em" }}>{title}</span>
    </div>
  );
};

export default Checkbox;
