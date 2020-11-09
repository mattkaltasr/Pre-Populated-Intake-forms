import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./SubmitButton.css";

const SubmitButton = ({ text, disabled, onClick }) => {
  return (
    <button
      className={classNames("submit-button", { disabled })}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      type="button"
    >
      {text}
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  text: "Save",
  disabled: false,
};

export default SubmitButton;
