import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import _ from "lodash";

import FormLabel from "./FormLabel";

import "./TextInput.css";

const TextInput = ({
  title,
  value,
  isRequired,
  placeholder,
  fieldName,
  grow,
  setFieldValue,
}) => {
  return (
    <div
      className={classNames("flex flex-col input-field-outer", {
        grow: !!grow,
      })}
      style={{
        margin: "auto 0 auto 0",
      }}
    >
      <FormLabel title={title} isRequired={isRequired} small />
      <textarea
        className="input-field"
        value={value}
        onChange={({ target: { value: nextValue } }) =>
          setFieldValue(fieldName, nextValue)
        }
        placeholder={placeholder || _.lowerCase(title)}
      />
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.bool,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  isRequired: false,
  grow: false,
  placeholder: null,
  value: null,
};

export default TextInput;
