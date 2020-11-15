import React from "react";
import _ from "lodash";

const Cell = ({ value, onChange }) => (
  <div style={{ flex: 1, display: "flex", margin: "0.25em" }}>
    <input
      style={{ width: "1em", flex: 1 }}
      value={value}
      onChange={({ target: { value: next } }) => onChange(next)}
      className="input-field small"
    />
  </div>
);

/** adjust as needed */
const MED_COUNT = 4;

const Medications = ({ setMedicationValue, patientMedications }) => {
  /** enforce min array length of 4, max of incoming */
  const effectiveArr =
    patientMedications.length >= MED_COUNT
      ? patientMedications
      : patientMedications.concat(
          _.range(MED_COUNT - patientMedications.length).map(() => ({}))
        );

  return (
    <div className="flex flex-col" style={{ marginTop: "1em" }}>
      <div className="flex" style={{ marginBottom: "0.25em" }}>
        <strong style={{ flex: 1, fontSize: "0.85em" }}>Medication</strong>
        <strong style={{ flex: 1, fontSize: "0.85em" }}>Condition</strong>
        <strong style={{ flex: 1, fontSize: "0.85em" }}>Dosage</strong>
        <strong style={{ flex: 1, fontSize: "0.85em" }}>Frequency</strong>
      </div>
      <div className="flex flex-col">
        {effectiveArr.map((med, idx) => {
          const { condition, dosage, frequency, medication } = med;
          const key = idx;

          return (
            <div
              className="flex"
              key={key}
              style={{ borderBottom: "1px solid lightgray", padding: "0.25em" }}
            >
              <Cell
                onChange={(val) => setMedicationValue(idx, "condition", val)}
                value={condition}
              />
              <Cell
                onChange={(val) => setMedicationValue(idx, "dosage", val)}
                value={dosage}
              />
              <Cell
                onChange={(val) => setMedicationValue(idx, "frequency", val)}
                value={frequency}
              />
              <Cell
                onChange={(val) => setMedicationValue(idx, "medication", val)}
                value={medication}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Medications;
