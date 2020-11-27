import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import FormLabel from "./FormLabel";

import "./TextInput.css";

const DateField = ({
  title,
  value,
  isRequired,
  grow,
  onChange,
  valueDiffers,
  small,
  ...props
}) => {
  return (
    <div
      className={classNames("flex flex-col input-field-outer", {
        grow: !!grow,
        different: valueDiffers,
        small,
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
        {...props}
      />
    </div>
  );
};

DateField.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  grow: PropTypes.bool,
  isRequired: PropTypes.bool,
  valueDiffers: PropTypes.bool,
  small: PropTypes.bool,
};

DateField.defaultProps = {
  value: new Date(),
  isRequired: false,
  grow: false,
  valueDiffers: false,
  small: false,
};

export default DateField;
