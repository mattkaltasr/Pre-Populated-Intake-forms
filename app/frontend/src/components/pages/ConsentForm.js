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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor
            purus non enim praesent elementum facilisis leo. Sapien pellentesque
            habitant morbi tristique senectus et netus et malesuada. Interdum
            posuere lorem ipsum dolor. Amet consectetur adipiscing elit
            pellentesque habitant morbi tristique. Pellentesque elit eget
            gravida cum. Pulvinar sapien et ligula ullamcorper malesuada.
            Venenatis cras sed felis eget velit aliquet sagittis id consectetur.
            Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed
            ullamcorper. 
            </p>
          <p>Faucibus purus in massa tempor. Odio facilisis mauris
            sit amet massa vitae tortor. Velit ut tortor pretium viverra. Est
            pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Eu
            sem integer vitae justo eget. Amet porttitor eget dolor morbi.
            Malesuada pellentesque elit eget gravida cum. Semper feugiat nibh
            sed pulvinar proin gravida. Nunc sed velit dignissim sodales ut.
            Volutpat lacus laoreet non curabitur. Aliquam purus sit amet luctus
            venenatis lectus. Cursus mattis molestie a iaculis at erat.
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
