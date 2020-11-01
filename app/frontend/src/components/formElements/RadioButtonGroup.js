import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import FormLabel from "./FormLabel";

const RadioButton = ({ label, checked, onChange }) => {
  return (
    <div
      className="flex action-area"
      style={{ cursor: "pointer", width: "min-content", fontSize: "0.8em" }}
      onClick={onChange}
    >
      <input type="radio" checked={checked} onChange={onChange} />
      <span style={{ marginLeft: "0.25em" }}>{label}</span>
    </div>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};

const RadioButtonGroup = ({
  title,
  options,
  value,
  isRequired,
  setFieldValue,
  fieldName,
}) => (
  <div
    className={classNames("flex flex-col input-field-outer")}
    style={{ padding: "0.5em", margin: "auto 0 auto 0" }}
  >
    <FormLabel title={title} isRequired={isRequired} />
    <div className="flex" style={{ flexWrap: "wrap" }}>
      {options.map((option) => {
        const { aliasValues, value: optionValue, label } = option;

        return (
          <RadioButton
            key={label}
            label={label}
            checked={
              value === optionValue || (aliasValues && aliasValues.has(value))
            }
            onChange={() => setFieldValue(fieldName, optionValue)}
          />
        );
      })}
    </div>
  </div>
);

RadioButtonGroup.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.string.isRequired,
  setFieldValue: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};

export default RadioButtonGroup;
