import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import _ from "lodash";
import DatePicker from "react-datepicker";

import FormLabel from "./FormLabel";

import "./TextInput.css";

const DateField = ({
  title,
  value,
  isRequired,
  placeholder,
  grow,
  onChange,
  valueDiffers,
  small,
  error,
  ...inputProps
}) => {
  return (
    <div
      className={classNames("flex flex-col input-field-outer", {
        grow: !!grow,
        different: valueDiffers,
        small,
        error,
      })}
      style={{
        margin: "auto 0 auto 0",
      }}
    >
      <FormLabel title={title} isRequired={isRequired} />
      <DatePicker
        className="input-field"
        selected={value || new Date()}
        onChange={(date) => onChange(date)}
      />
    </div>
  );
};

DateField.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.bool,
  isRequired: PropTypes.bool,
  valueDiffers: PropTypes.bool,
  small: PropTypes.bool,
  placeholder: PropTypes.string,
};

DateField.defaultProps = {
  isRequired: false,
  grow: false,
  placeholder: null,
  value: null,
  valueDiffers: false,
  small: false,
};

export default DateField;
