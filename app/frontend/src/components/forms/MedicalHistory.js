import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import FormContainer from "../containers/FormContainer";
import Checkbox from "../formElements/Checkbox";
import { loadPatientInfoById } from "../../util/apiHelpers";
import Medications from "./Medications";

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

const MedicalHistory = ({ selectedPatientId }) => {
  const [otherCondition, setOther] = React.useState("");

  const [patientAnswers, setAnswers] = React.useState({}); // hold patient/user responses
  const [patientData, setPatientData] = React.useState({}); // "immutable" copy of fhir data

  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedPatientId) {
      loadPatientInfoById({
        patientId: selectedPatientId,
        endpoint: "medications",
        setData: (data) => {
          const result = data || [];

          if (result) {
            setAnswers({ ...patientAnswers, medications: result });
            setPatientData({ ...patientData, medications: result });
          }
        },
        setError,
        setLoading,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatientId]);

  const setFieldValue = (key, value) =>
    setAnswers({ ...patientAnswers, [key]: value });

  /** edit a specific medication's field in array */
  const setMedicationValue = (medicationIndex, key, value) =>
    setAnswers({
      ...patientAnswers,
      medications: _.get(patientAnswers, "medications", [])
        .slice(0, medicationIndex)
        .concat({
          ..._.get(patientAnswers, `medications[${medicationIndex}]`, {}),
          [key]: value,
        })
        .concat(
          _.get(patientAnswers, "medications", []).slice(medicationIndex + 1)
        ),
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
                  patientAnswers,
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
          <Medications
            setMedicationValue={setMedicationValue}
            patientMedications={_.get(patientAnswers, "medications", [])}
          />
        </div>
      }
    />
  );
};

MedicalHistory.propTypes = {
  selectedPatientId: PropTypes.string.isRequired,
};

export default MedicalHistory;
