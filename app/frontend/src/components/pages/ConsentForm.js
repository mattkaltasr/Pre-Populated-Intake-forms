import React from "react";
import PropTypes from "prop-types";

import Checkbox from "../formElements/Checkbox";
import Button from "../formElements/Button";

const ConsentForm = ({ handleConsentAgree }) => {
  const [didRead, setDidRead] = React.useState(false);

  return (
    <div
      className="flex flex-col form-container"
      style={{
        border: "none",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          maxWidth: "800px",
          flex: 1,
          margin: "0 auto auto auto",
        }}
      >
        <h3 style={{ margin: "0 auto 0.5em auto" }}>Consent Form</h3>
        <span style={{ textAlign: "center", marginBottom: "1em" }}>
          Please acknowledge reading and accepting conditions in consent form.
        </span>
        <div
          style={{
            backgroundColor: "rgb(204, 204, 204, .26)",
            padding: "1em 2em 1em 2em",
            borderRadius: "0.28em",
          }}
        >
          <p>
            Information provided here will be used in diagnosis, records; examinations and claims information
            <li><b>Treatment</b> means providing, coordinating or managing mental health care and related services.</li>
            <li><b>Payment</b> means activities such as obtaining payment for the mental health care services I provide for you from your insurance or another third party payer.</li>
            <li><strong>Health care operations</strong> include the business aspects of running a practice</li>
            </p>
          <p>Your health information is secure and protected at all times. It will not be released to anyone unauthorized. You protected health information will be used or disclosed when required by federal, state or local law
          </p>
        </div>
      </div>
      <div className="flex flex-col" style={{ margin: "1em auto 0 auto" }}>
        <Checkbox
          title="I have read the consent form."
          checked={didRead}
          onChange={() => setDidRead(!didRead)}
        />
        <div className="flex">
          <Button
            style={{ margin: "auto auto auto 0", width: "7em" }}
            text="Agree"
            disabled={!didRead}
            onClick={() => handleConsentAgree(true)}
          />
          <Button
            style={{
              margin: "auto 0 auto auto",
              width: "7em",
              backgroundColor: "lightgray",
              color: "black",
            }}
            text="Disagree"
            disabled={!didRead}
            onClick={() => handleConsentAgree(false)}
          />
        </div>
      </div>
    </div>
  );
};

ConsentForm.propTypes = {
  handleConsentAgree: PropTypes.func.isRequired,
};

export default ConsentForm;
