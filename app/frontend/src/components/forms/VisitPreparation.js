import React from "react";
import PropTypes from "prop-types";

import FormContainer from "../containers/FormContainer";
import TextArea from "../formElements/TextArea";
import SubmitButton from "../formElements/Button";

const PatientInfo = ({ patientData, handleSubmit }) => {
  const [patientAnswers, setAnswers] = React.useState({ ...patientData });

  React.useEffect(() => {
    setAnswers({ ...patientData });
  }, [patientData]);

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
                title="Do you have any specific requests for new medications, refills, or tests?"
                fieldName="patientRequests"
                grow
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
                title="Is there anything else you want to remember for your appointment?"
                fieldName="patientOther"
                grow
                setFieldValue={setFieldValue}
                value={patientAnswers.patientOther}
              />
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
          <div style={{ margin: "auto" }}>
            <SubmitButton onClick={handleSubmit} />
          </div>
        </div>
      }
    />
  );
};

PatientInfo.propTypes = {
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line react/forbid-prop-types
  patientData: PropTypes.object.isRequired,
};

export default PatientInfo;
