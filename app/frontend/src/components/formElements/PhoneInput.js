import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";

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
  error,
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
      <PhoneInput
        className="input-field"
        country="us"
        value={value}
        onChange={(phone) => onChange(phone)}
        disableCountryCode
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
};

DateField.defaultProps = {
  isRequired: false,
  grow: false,
  value: null,
  valueDiffers: false,
  small: false,
};

export default DateField;
