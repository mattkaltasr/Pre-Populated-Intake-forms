import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import FormLabel from "./FormLabel";

const RadioButton = ({ label, checked, onChange }) => (
  <div
    className="flex action-area"
    style={{
      cursor: "pointer",
      width: "min-content",
      fontSize: "0.8em",
      userSelect: "none",
    }}
    onClick={onChange}
  >
    <input type="radio" checked={!!checked} onChange={onChange} />
    <span style={{ margin: "auto auto auto 0.25em" }}>{label}</span>
  </div>
);

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
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
    {title ? <FormLabel title={title} isRequired={isRequired} /> : null}
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isRequired: PropTypes.bool,
};

RadioButtonGroup.defaultProps = {
  title: null,
  isRequired: false,
};

export default RadioButtonGroup;
