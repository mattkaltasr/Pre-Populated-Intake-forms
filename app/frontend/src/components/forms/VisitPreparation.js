/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";

import FormContainer from "../containers/FormContainer";
import TextArea from "../formElements/TextArea";
import SubmitButton from "../formElements/Button";
import RadioButtonGroup from "../formElements/RadioButtonGroup";

const BinaryRadioButtonGroup = ({
  inactiveInputs,
  setInactiveInputs,
  fieldName,
}) => (
  <RadioButtonGroup
    value={!!inactiveInputs[fieldName]}
    onChange={(v) => {
      setInactiveInputs({
        ...inactiveInputs,
        [fieldName]: v,
      });
    }}
    fieldName={fieldName}
    options={[
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ]}
  />
);

BinaryRadioButtonGroup.propTypes = {
  inactiveInputs: PropTypes.objectOf(PropTypes.bool).isRequired,
  setInactiveInputs: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};

const PatientInfo = ({ handleSubmit }) => {
  const [patientAnswers, setAnswers] = React.useState({});
  const [inactiveInputs, setInactiveInputs] = React.useState({});

  const setFieldValue = (key, value) =>
    setAnswers({ ...patientAnswers, [key]: value });

  return (
    <FormContainer
      title="Preparing For Your Visit"
      formComponents={
        <div className="flex flex-col">
          <div className="flex" style={{ flex: 1, flexWrap: "wrap" }}>
            <div
              className="flex flex-col"
              style={{ flex: 1, minWidth: "250px" }}
            >
              <TextArea
                placeholder="text"
                title="What concerns did you want to be certain are looked into your appointment?"
                fieldName="patientConcerns"
                grow
                setFieldValue={setFieldValue}
                value={patientAnswers.patientConcerns}
              />
              <TextArea
                placeholder="text"
                title={
                  <div className="flex flex-col">
                    <span>
                      Do you have any specific requests for new medications,
                      refills, or tests?
                    </span>
                    <BinaryRadioButtonGroup
                      fieldName="hasRequests"
                      setInactiveInputs={setInactiveInputs}
                      inactiveInputs={inactiveInputs}
                    />
                  </div>
                }
                fieldName="patientRequests"
                grow
                disabled={!inactiveInputs.hasRequests}
                setFieldValue={setFieldValue}
                value={patientAnswers.patientRequests}
              />
              <TextArea
                placeholder="text"
                title="Any other comments?"
                fieldName="patientComments"
                grow
                setFieldValue={setFieldValue}
                value={patientAnswers.patientComments}
              />
            </div>
            <div className="flex flex-col" style={{ flex: 1 }}>
              <TextArea
                placeholder="text"
                title="What are the symptoms you are aware of?"
                fieldName="patientSymptoms"
                grow
                setFieldValue={setFieldValue}
                value={patientAnswers.patientSymptoms}
              />
              <TextArea
                placeholder="text"
                title={
                  <div className="flex flex-col">
                    <span>
                      Is there anything else you want to remember for your
                      appointment?
                    </span>
                    <BinaryRadioButtonGroup
                      fieldName="hasAdditionalComments"
                      setInactiveInputs={setInactiveInputs}
                      inactiveInputs={inactiveInputs}
                    />
                  </div>
                }
                disabled={!inactiveInputs.hasAdditionalComments}
                fieldName="patientOther"
                grow
                setFieldValue={setFieldValue}
                value={patientAnswers.patientOther}
              />
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
          <SubmitButton
            style={{ margin: "1em auto auto 0", width: "10em" }}
            text="Submit"
            // disabled={isLoading || isSubmitted}
            onClick={handleSubmit}
          />
        </div>
      }
    />
  );
};

export default PatientInfo;
