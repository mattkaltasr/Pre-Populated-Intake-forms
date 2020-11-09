import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Button.css";

const SubmitButton = ({ text, disabled, onClick, style }) => {
  return (
    <button
      className={classNames("submit-button", { disabled })}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      type="button"
      style={{
        ...(style || {}),
      }}
    >
      {text}
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  text: "Save",
  disabled: false,
  style: {},
};

export default SubmitButton;
