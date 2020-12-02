import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import "../Medications.css";

const Cell = ({ value, onChange, disabled }) => (
  <div style={{ flex: 1, display: "flex", margin: "0.25em" }}>
    <input
      style={{ width: "1em", flex: 1, cursor: disabled ? "not-allowed" : "" }}
      value={value}
      disabled={!!disabled}
      onChange={({ target: { value: next } }) => onChange(next)}
      className="input-field small"
    />
  </div>
);

/** adjust as needed */
const MED_COUNT = 4;

/** enforce min array length of 4, max of incoming */
const normalizeMedicationsArray = ({ patientMedications }) => {
  if (patientMedications.length >= MED_COUNT) {
    return patientMedications;
  }
  return patientMedications.concat(
    _.range(MED_COUNT - patientMedications.length).map(() => ({}))
  );
};

const Medications = ({ setMedicationValue, patientMedications }) => {
  const effectiveArr = normalizeMedicationsArray({ patientMedications });

  return (
    <div className="flex flex-col" style={{ marginTop: "1em" }}>
      <div className="flex" style={{ marginBottom: "0.25em" }}>
        <strong style={{ flex: 1, fontSize: "0.85em", padding: "0.25em" }}>
          Medication
        </strong>
        <strong style={{ flex: 1, fontSize: "0.85em", padding: "0.25em" }}>
          Condition
        </strong>
        <strong style={{ flex: 1, fontSize: "0.85em", padding: "0.25em" }}>
          Dosage
        </strong>
        <strong style={{ flex: 1, fontSize: "0.85em", padding: "0.25em" }}>
          Frequency
        </strong>
      </div>
      <div className="flex flex-col">
        {effectiveArr.map((med, idx) => {
          const { condition, dosage, frequency, medication, id } = med;

          const key = idx;
          const disabled = !id;

          return (
            <div className="flex medical-row" key={key}>
              <Cell
                onChange={(val) => setMedicationValue(idx, "medication", val)}
                value={
                  medication !== undefined && medication.display !== undefined
                    ? medication.display
                    : ""
                }
                disabled={disabled}
              />
              <Cell
                onChange={(val) => setMedicationValue(idx, "condition", val)}
                value={
                  condition !== undefined && condition.display !== undefined
                    ? condition.display
                    : ""
                }
                disabled={disabled}
              />
              <Cell
                onChange={(val) => setMedicationValue(idx, "dosage", +val)}
                value={dosage !== undefined ? dosage.value : ""}
                disabled={disabled}
              />
              <Cell
                onChange={(val) => setMedicationValue(idx, "frequency", +val)}
                value={frequency !== undefined ? frequency.frequency : ""}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Medications.propTypes = {
  setMedicationValue: PropTypes.func.isRequired,
  patientMedications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Medications;
