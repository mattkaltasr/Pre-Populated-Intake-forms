import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import FormContainer from "../containers/FormContainer";
import Checkbox from "../formElements/Checkbox";

const conditions = [
  "Anxiety",
  "Asthma",
  "Arthritis",
  "Cancer",
  "Diabetes",
  "Depression",
  "Heart Attack",
  "High Blood Pressure",
  "HIV/AIDS",
  "Kidney Stones",
  "Seizures",
  "Stroke",
  "Thyroid Disease",
];

/** these should probably be stowed away in a
 *  css class, but that would require wiring up
 *  an additional prop in each formElement to handle
 *  concatenating an exogenous class. OK for now
 *  */
const checkboxStyle = {
  padding: "0.25em",
  border: "1px solid lightgray",
  borderRadius: 0,
  margin: 0,
  width: "20%",
  fontSize: "0.9em",
  minWidth: "120px",
};

const MedicalHistory = ({ patientData }) => {
  const [patientAnswers, setAnswers] = React.useState({ ...patientData });
  const [otherCondition, setOther] = React.useState("");

  React.useEffect(() => {
    setAnswers({ ...patientData });
  }, [patientData]);

  const setFieldValue = (key, value) =>
    setAnswers({
      ...patientAnswers,
      medicalHistory: {
        ...(patientAnswers.medicalHistory || {}),
        [key]: value,
      },
    });

  return (
    <FormContainer
      title="Medical History"
      formComponents={
        <div className="flex flex-col" style={{ flex: 1, flexWrap: "wrap" }}>
          <div className="flex flex-col">
            <span style={{ fontSize: "0.8em", marginBottom: "0.5em" }}>
              (Please check or list any medical problems you have experienced)
            </span>
            <div
              className="flex"
              style={{
                flexWrap: "wrap",
                width: "100%",
                margin: "0 auto 0 auto",
              }}
            >
              {conditions.map((r) => {
                const toCamelCase = _.camelCase(r);
                const value = _.get(
                  patientAnswers.medicalHistory,
                  toCamelCase,
                  false // default to not selected
                );

                return (
                  <Checkbox
                    key={r}
                    title={r}
                    checked={!!value}
                    onChange={() => setFieldValue(toCamelCase, !value)}
                    style={{ ...checkboxStyle }}
                  />
                );
              })}
              <div style={{ ...checkboxStyle }} className="flex">
                <span style={{ margin: "auto 0.5em auto 0" }}>Other: </span>
                <input
                  style={{
                    flex: 1,
                    minWidth: "1em",
                    fontSize: "0.8em",
                  }}
                  onChange={({ target: { value } }) => setOther(value)}
                  value={otherCondition}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

MedicalHistory.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  patientData: PropTypes.object.isRequired,
};

export default MedicalHistory;
