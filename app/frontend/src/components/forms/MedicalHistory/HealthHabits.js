import React from "react";
import PropTypes from "prop-types";

import Checkbox from "../../formElements/Checkbox";

const checkboxStyle = {
  padding: "0.2em",
  fontSize: "0.8em",
  margin: "auto auto auto auto",
};

const smokingOptions = [
  "Everyday",
  "Some Days",
  "Former Smoker",
  "Passive Smoker (live with smoker)",
  "Never Smoked",
];

const packsOptions = ["1/4", "1/2", "1", "1.5", "2", "3"];
const alcoholOptions = ["Yes", "No", "Quit"];

const HealthHabits = ({ setMedicationValue, patientMedications }) => {
  const [selectedSmokingOption, setSelected] = React.useState(null);

  return (
    <div
      className="flex flex-col"
      style={{ flex: 1, minWidth: "300px", marginBottom: "1em" }}
    >
      <strong style={{ flex: 1, fontSize: "0.85em", marginBottom: "0.5em" }}>
        Health Habits
      </strong>
      <div className="flex flex-col" style={{ marginBottom: "0.5em" }}>
        <span
          style={{
            marginBottom: "0.25em",
            fontSize: "0.85em",
            fontWeight: 500,
          }}
        >
          Tobacco Use
        </span>
        <div className="flex">
          <span
            style={{
              fontSize: "0.8em",
              margin: "0 1em auto 0",
              whiteSpace: "pre",
            }}
          >
            Smoking Status/History:
          </span>
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {smokingOptions.map((opt) => (
              <Checkbox
                key={opt}
                title={opt}
                checked={selectedSmokingOption === opt}
                onChange={() =>
                  setSelected(selectedSmokingOption === opt ? null : opt)
                }
                style={{ ...checkboxStyle }}
              />
            ))}
          </div>
        </div>
        <div className="flex">
          <span
            style={{
              fontSize: "0.8em",
              margin: "0 1em auto 0",
              whiteSpace: "pre",
            }}
          >
            How many packs per day?
          </span>
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {packsOptions.map((opt) => (
              <Checkbox
                key={opt}
                title={opt}
                checked={selectedSmokingOption === opt}
                onChange={() =>
                  setSelected(selectedSmokingOption === opt ? null : opt)
                }
                style={{ ...checkboxStyle }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col" style={{ marginBottom: "0.5em" }}>
        <span
          style={{
            marginBottom: "0.25em",
            fontSize: "0.85em",
            fontWeight: 500,
          }}
        >
          Alcohol Use
        </span>
        <div className="flex">
          <span
            style={{
              fontSize: "0.8em",
              margin: "0 1em auto 0",
              whiteSpace: "pre",
            }}
          >
            Do you drink alcohol?
          </span>
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {alcoholOptions.map((opt) => (
              <Checkbox
                key={opt}
                title={opt}
                checked={selectedSmokingOption === opt}
                onChange={() =>
                  setSelected(selectedSmokingOption === opt ? null : opt)
                }
                style={{ ...checkboxStyle }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span
          style={{
            marginBottom: "0.25em",
            fontSize: "0.85em",
            fontWeight: 500,
          }}
        >
          Recreational Drug Use
        </span>
        <div className="flex">
          <span
            style={{
              fontSize: "0.8em",
              margin: "0 1em auto 0",
              whiteSpace: "pre",
            }}
          >
            Do you use recreational drugs?
          </span>
          <div className="flex" style={{ flexWrap: "wrap" }}>
            {alcoholOptions.map((opt) => (
              <Checkbox
                key={opt}
                title={opt}
                checked={selectedSmokingOption === opt}
                onChange={() =>
                  setSelected(selectedSmokingOption === opt ? null : opt)
                }
                style={{ ...checkboxStyle }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

HealthHabits.propTypes = {
  setMedicationValue: PropTypes.func.isRequired,
  patientMedications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HealthHabits;
